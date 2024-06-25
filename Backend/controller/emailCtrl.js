const nodemailer = require("nodemailer");
const asyncHandler = require("express-async-handler");
const expressAsyncHandler = require("express-async-handler");

const sendEmail = expressAsyncHandler(async (data, req, res) => {
    console.log(data)
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: process.env.MAIL_ID,
      pass: process.env.MP,
    },
  });

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: 'react.mayurpawar@gmail.com', // sender address
    to: data.to, // list of receivers
    subject: data.subject, // Subject line
    text: data.text, // plain text body
    html: data.htm, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
});
module.exports = sendEmail;
