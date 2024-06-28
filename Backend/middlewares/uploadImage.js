const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/images"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ".jpeg");
  },
});

// Filter to allow only image files
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb({ message: "Unsupported file format" }, false);
  }
};

// Initialize multer upload
const uploadPhoto = multer({
  storage: storage,
  fileFilter: multerFilter,
  limits: { fileSize: 1000000 },
});

// Helper function to ensure directory exists
const ensureDirectoryExists = (filePath) => {
  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(filePath, { recursive: true });
  }
};

// Resize product images
const productImgResize = async (req, res, next) => {
  if (!req.files) return next();
  try {
    await Promise.all(
      req.files.map(async (file) => {
        const outputDir = path.join(__dirname, "../public/images/products");
        ensureDirectoryExists(outputDir);
        const outputFilePath = path.join(outputDir, file.filename);
        await sharp(file.path)
          .resize(300, 300)
          .toFormat("jpeg")
          .jpeg({ quality: 90 })
          .toFile(outputFilePath);
        try {
          fs.unlinkSync(file.path); // Remove original file
        } catch (error) {
          console.error(`Error deleting file: ${file.path}`, error);
        }
      })
    );
    next();
  } catch (error) {
    console.error("Error processing images", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Resize blog images
const blogImgResize = async (req, res, next) => {
  if (!req.files) return next();
  try {
    await Promise.all(
      req.files.map(async (file) => {
        const outputDir = path.join(__dirname, "../public/images/blogs");
        ensureDirectoryExists(outputDir);
        const outputFilePath = path.join(outputDir, file.filename);
        await sharp(file.path)
          .resize(300, 300)
          .toFormat("jpeg")
          .jpeg({ quality: 90 })
          .toFile(outputFilePath);
        try {
          fs.unlinkSync(file.path); // Remove original file
        } catch (error) {
          console.error(`Error deleting file: ${file.path}`, error);
        }
      })
    );
    next();
  } catch (error) {
    console.error("Error processing images", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { uploadPhoto, productImgResize, blogImgResize };
