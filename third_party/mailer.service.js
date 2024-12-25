const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendEmail = async (to, subject, templateName, templateData) => {
  try {
    const templatePath = path.join(
      __dirname,
      "email_templates",
      `${templateName}.ejs`
    );

    const html = await ejs.renderFile(templatePath, templateData);

    const info = await transporter.sendMail({
      from: '"E Shopper" <eshopper@info.com>',
      to,
      subject,
      html,
    });

    return info;
  } catch (error) {
    throw new Error("Error sending email: " + error.message);
  }
};

module.exports = {
  sendEmail,
};
