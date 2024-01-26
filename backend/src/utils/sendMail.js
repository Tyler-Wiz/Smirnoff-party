const Mailgen = require("mailgen");
const nodemailer = require("nodemailer");

const sendEmail = async (name, email) => {
  let MailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "SMIRNOFF PARTY",
      link: "https://mailgen.js/", // this can be change according to your requirement
    },
  });

  let response = {
    body: {
      name: name,
      intro: "Welcome to ABC Company! We're very excited to have you on board.",
      action: {
        instructions: "To get started with ABC, please click here:",
        button: {
          color: "#22BC66", // Optional action button color
          text: "Confirm your account",
          link: "https://mailgen.js/",
        },
      },
    },
  };
  let mail = MailGenerator.generate(response);
  const transporter = nodemailer.createTransport({
    // Your email service configuration (SMTP, Gmail, etc.)
    service: "gmail",
    auth: {
      user: process.env.NODEJS_GMAIL_APP_USER,
      pass: process.env.NODEJS_GMAIL_APP_PASSWORD,
    },
  });
  // Email content
  let message = {
    from: process.env.NODEJS_GMAIL_APP_USER, // sender address
    to: email, // list of receivers
    subject: "Thank you for Coming on Board", // Subject line
    attachDataUrls: true,
    html: mail, // html body
  };

  const mailSent = await transporter.sendMail(message);
  return mailSent;
};

module.exports = sendEmail;
