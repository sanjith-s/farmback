const hbs = require("nodemailer-express-handlebars");
const nodemailer = require("nodemailer");
const path = require("path");
require('dotenv').config();
const moment = require('moment');

const sendReview = (client, data) => {
  // initialize nodemailer
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_ID,
      pass: process.env.GMAIL_PASS,
    },
  });

  // point to the template folder
  const handlebarOptions = {
    viewEngine: {
      partialsDir: path.resolve("./views/"),
      defaultLayout: false,
    },
    viewPath: path.resolve("./views/"),
  };

  // use a template file with nodemailer
  transporter.use("compile", hbs(handlebarOptions));

  var mailOptions = {
    from: '"Team Farmenience" <farmenienceofficial@gmail.com>', // sender address
    to: client, // list of receivers
    subject: "Review received - Farmenience",
    template: "review", // the name of the template file i.e email.handlebars
    context: {
    //   name: "Adebola", // replace {{name}} with Adebola
      name: data.name,
      number: data.number,
      review: data.review,
      date:  moment().format('DD/MM/YYYY')      //OTP
    },
  };

  // trigger the sending of the E-mail
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: " + info.response);
  });

};
module.exports = {
    sendReview,
} 