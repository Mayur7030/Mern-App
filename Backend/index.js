const express = require("express");
const dbConnect = require("./config/dbConnect");
const app = express();
const dotenc = require("dotenv").config();
const PORT = process.env.PORT || 4000;
const authRouter = require("./routes/authRoute");
const bodyParser = require("body-parser");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
dbConnect();
const cookieParser = require('cookie-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/user", authRouter);
app.use(notFound);
app.use(errorHandler);
app.use(cookieParser)

app.listen(PORT, () => {
  console.log(`server is running at port ${PORT}`);
});
