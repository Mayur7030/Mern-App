const { default: mongoose } = require("mongoose");

const dbConnect = async () => {
  try {
    const conn = mongoose.connect(process.env.MONGODB_URL);
    console.log("Database connected successfully...");
  } catch (err) {
    console.log("Database err", err);
  }
};

module.exports = dbConnect;
