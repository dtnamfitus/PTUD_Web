const nodemailer = require("nodemailer");
const emailQueue = require("../worker/email.worker");
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
    await emailQueue.add({
      to,
      subject,
      templateName,
      templateData,
    });

    return { status: "Email job added to queue" };
  } catch (error) {
    throw new Error("Error adding email job to queue: " + error.message);
  }
};

module.exports = {
  sendEmail,
};
