import nodemailer from "nodemailer";
import Mailgen from "mailgen";

// ethereal.email
let nodeConfig = {
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL, // generated ethereal user
    pass: process.env.PASSWORD, // generated ethereal password
  },
};

let transporter = nodemailer.createTransport(nodeConfig);

let MailGenerator = new Mailgen({
  theme: "default",
  product: {
    name: "Mailgen",
    link: "https://mailgen.js/",
  },
});

export const registerMail = async (req, res) => {
  const { username, userEmail, text, subject } = req.body;

  // body of the email
  var email = {
    body: {
      name: username,
      intro:
        text || "Welcome to Mailgen! We're very excited to have you on board.",
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };

  // generate an HTML email with the provided contents
  var emailBody = MailGenerator.generate(email);

  let message = {
    from: process.env.EMAIL, // sender address
    to: userEmail, // list of receivers
    subject: subject || "Signup successfull", // Subject line
    html: emailBody,
  };

  // send mail with defined transport object
  transporter
    .sendMail(message)
    .then(() => {
      res.status(200).send({ message: "You should receive an email from us." });
    })
    .catch((error) => {
      res.status(500).send({ error });
    });
};
