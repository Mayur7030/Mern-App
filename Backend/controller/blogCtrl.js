const Blog = require("../models/blogModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

const validateMongoDBId = require("../utils/validateMongoDBId");
const createBlog = asyncHandler(async (req, res) => {
  try {
    const newBlog = await Blog.create(req.body);
    res.json({
      status: "Success",
      newBlog,
    });
  } catch (err) {
    throw new Error(err);
  }
});

const updateBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDBId(id);
  try {
    const updateBlog = await Blog.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updateBlog);
  } catch (err) {
    throw new Error(err);
  }
});

const getBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDBId(id);
  try {
    const getBlog = await Blog.findById(id).populate('likes').populate('dislikes')
    const updateViews = await Blog.findByIdAndUpdate(
      id,
      {
        $inc: {
          numViews: 1,
        },
      },
      {
        new: true,
      }
    );
    await Blog.findByIdAndUpdate(id, { $inc: { numView: 1 } }, { new: true });
    res.json(getBlog);
  } catch (err) {
    throw new Error(err);
  }
});

const getAllBlogs = asyncHandler(async (req, res) => {
  try {
    const getAllBlogs = await Blog.find();
    res.json(getAllBlogs);
  } catch (err) {
    throw new Error(err);
  }
});

const deleteBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDBId(id);
  try {
    const deleteBlog = await Blog.findByIdAndDelete(id);
    res.json(deleteBlog);
  } catch (err) {
    throw new Error(err);
  }
});

// const likeBlog = asyncHandler(async (req, res) => {
//   const { blogId } = req.body;
//   validateMongoDBId(blogId);

//   //find the blog which you want to be like
// //   console.log(Blog)
//   const blog = await Blog.findById(blogId);
//   //find the login user
//   const loginUserId = req?.user?._id;
//   //find if the user had liked the blog
//   const isLiked = blog?.isLiked;
//   //find the user if he disliked the blog
//   const alreadyDisliked = blog?.dislikes?.find(
//     (userId => userId?.toString() === loginUserId?.toString())
//   );
//   if (alreadyDisliked) {
//     const blog = await Blog.findByIdAndUpdate(
//       blogId,
//       {
//         $pull: {
//           dislikes: loginUserId,
//         },
//         isDisliked: false,
//       },
//       {
//         new: true,
//       }
//     );
//     res.json(blog);
//   }
//   if (isLiked) {
//     const blog = await Blog.findByIdAndUpdate(
//       blogId,
//       {
//         $pull: {
//           likes: loginUserId,
//         },
//         isLiked: false,
//       },
//       {
//         new: true,
//       }
//     );
//     res.json(blog);
//   }
// });

// const dislikeBlog = asyncHandler(async (req, res) => {
//     const { blogId } = req.body;
//     validateMongoDBId(blogId);
  
//     //find the blog which you want to be like
//   //   console.log(Blog)
//     const blog = await Blog.findById(blogId);
//     //find the login user
//     const loginUserId = req?.user?._id;
//     //find if the user had liked the blog
//     const isDisliked = blog?.isDisliked;
//     //find the user if he disliked the blog
//     const alreadyLiked = blog?.likes?.find(
//       (userId => userId?.toString() === loginUserId?.toString())
//     );
//     if (alreadyLiked) {
//       const blog = await Blog.findByIdAndUpdate(
//         blogId,
//         {
//           $pull: {
//             likes: loginUserId,
//           },
//           isLiked: false,
//         },
//         {
//           new: true,
//         }
//       );
//       res.json(blog);
//     }
//     if (isDisliked) {
//       const blog = await Blog.findByIdAndUpdate(
//         blogId,
//         {
//           $pull: {
//             dislikes: loginUserId,
//           },
//           isDisliked: false,
//         },
//         {
//           new: true,
//         }
//       );
//       res.json(blog);
//     }else{
//         const blog = await Blog.findByIdAndUpdate(blogId,
//             {
//                 $push:{dislikes:loginUserId},
//                 isDisliked:true
//             },{
//                 new : true
//             }
//         );
//         res.json(blog)
//     }
//   });


const liketheBlog = asyncHandler(async (req, res) => {
    const { blogId } = req.body;
    validateMongoDBId(blogId);
    // Find the blog which you want to be liked
    const blog = await Blog.findById(blogId);
    // find the login user
    const loginUserId = req?.user?._id;
    // find if the user has liked the blog
    const isLiked = blog?.isLiked;
    // find if the user has disliked the blog
    
    const alreadyDisliked = blog?.dislikes?.find(
      (userId) => userId?.toString() === loginUserId?.toString()
    );
    if (alreadyDisliked) {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $pull: { dislikes: loginUserId },
          isDisliked: false,
        },
        { new: true }
      );
      res.json(blog);
    }
    if (isLiked) {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $pull: { likes: loginUserId },
          isLiked: false,
        },
        { new: true }
      );
      res.json(blog);
    } else {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $push: { likes: loginUserId },
          isLiked: true,
        },
        { new: true }
      );
      res.json(blog);
    }
  });
  const disliketheBlog = asyncHandler(async (req, res) => {
    const { blogId } = req.body;
    validateMongoDBId(blogId);
    // Find the blog which you want to be liked
    const blog = await Blog.findById(blogId);
    // find the login user
    const loginUserId = req?.user?._id;
    // find if the user has liked the blog
    const isDisLiked = blog?.isDisliked;
    // find if the user has disliked the blog
    const alreadyLiked = blog?.likes?.find(
      (userId) => userId?.toString() === loginUserId?.toString()
    );
    if (alreadyLiked) {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $pull: { likes: loginUserId },
          isLiked: false,
        },
        { new: true }
      );
      res.json(blog);
    }
    if (isDisLiked) {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $pull: { dislikes: loginUserId },
          isDisliked: false,
        },
        { new: true }
      );
      res.json(blog);
    } else {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $push: { dislikes: loginUserId },
          isDisliked: true,
        },
        { new: true }
      );
      res.json(blog);
    }
  });
  


module.exports = {
  createBlog,
  updateBlog,
  getBlog,
  getAllBlogs,
  deleteBlog,
//   likeBlog,
//   dislikeBlog,
  liketheBlog,
  disliketheBlog
};
