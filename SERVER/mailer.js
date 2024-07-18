const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "ssl0.ovh.net",
  port: 587,
  secure: false,
  auth: {
    user: "support@tech-shop.tech",
    pass: "TechShop!S",
  },
});

transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

function sendEmail(mailOptions) {
  return transporter.sendMail(mailOptions);
}

module.exports = {
  sendEmail,
};
