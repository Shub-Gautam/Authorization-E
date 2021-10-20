const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const sendMail = (email, uniqueString) => {
  let Transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  let mailOptions;
  let sender = "Eatoes";
  mailOptions = {
    from: sender,
    to: email,
    subject: "Email Conformation for eatoes",
    html: `Click <a herf="http://localhost:8080/verify/${uniqueString}">here</a> to verify your email.`,
  };

  Transport.sendMail(mailOptions, (err, response) => {
    if (err) {
      console.error("Not Delivered " + err);
    } else {
      console.log("Verification Message Sent");
    }
  });
};

module.exports = sendMail;
