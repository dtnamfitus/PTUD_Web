const emailQueue = require("../config/queue/emailQueue");
const nodemailer = require("nodemailer");
const path = require("path");
const ejs = require("ejs");
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

emailQueue.process(async (job) => {
  const { to, subject, templateName, templateData } = job.data;

  try {
    const templatePath = path.join(
      __dirname,
      "email_template",
      `${templateName}.ejs`
    );

    const html = await ejs.renderFile(templatePath, templateData);

    await transporter.sendMail({
      from: '"E Shopper" <eshopper@info.com>',
      to,
      subject,
      html,
    });
  } catch (error) {
    throw error;
  }
});

module.exports = emailQueue;
