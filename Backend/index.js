const express = require("express");
const dbConnect = require("./config/dbConnect");
const app = express();
const dotenc = require("dotenv").config();
const PORT = process.env.PORT || 4000;
const authRouter = require("./routes/authRoute");
const bodyParser = require("body-parser");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
dbConnect();
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const productRouter = require("./routes/productRoute");
const blogRouter = require("./routes/blogRoute");
const categoryRoute = require("./routes/prodcategoryRoute");
const blogcategoryRouter = require("./routes/blogCatRoute");
const brandRouter = require("./routes/brandRoute");
// const colorRouter = require("./routes/colorRoute");
// const enqRouter = require("./routes/enqRoute");
const couponRouter = require("./routes/couponRoute");
const uploadRouter = require("./routes/uploadRoute");

// const cors = require("cors");




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(morgan());
app.use("/api/user", authRouter);
app.use("/api/product", productRouter);
app.use("/api/blog", blogRouter);
app.use("/api/category", categoryRoute);
app.use("/api/blogcategory", blogcategoryRouter);
app.use("/api/brand", brandRouter);
app.use("/api/coupon", couponRouter);
app.use("/api/coupon", couponRouter);
// app.use("/api/color", colorRouter);
// app.use("/api/enquiry", enqRouter);
app.use("/api/product/upload", uploadRouter);




app.use(notFound);
app.use(errorHandler);
app.use(cookieParser);
app.listen(PORT, () => {
  console.log(`server is running at port ${PORT}`);
});
