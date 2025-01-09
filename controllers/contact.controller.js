const nodemailer = require("nodemailer");
const renderLayout = require("./renderLayout");

const getContact = async (req, res) => {
  try {
    const bodyHtml = await new Promise((resolve, reject) => {
      res.render(
        "client/contact/contact",
        { title: "Contact Us" },
        (err, html) => {
          if (err) return reject(err);
          resolve(html);
        }
      );
    });

    // Render layout với nội dung body từ contact.ejs
    await renderLayout(req, res, bodyHtml, "Contact Us");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error loading contact page");
  }
};

const submitContactForm = async (req, res) => {
  const { name, email, message } = req.body;

  // Check if all fields are provided
  if (!name || !email || !message) {
    return res.status(400).send("All fields are required.");
  }

  try {
    // Set up the email transporter
    const transporter = nodemailer.createTransport({
      service: "gmail", // You can use another email service
      auth: {
        user: "your-email@gmail.com", // Your email address
        pass: "your-email-password", // Your email password (consider using environment variables for security)
        //or add the relevant auth method
      },
    });

    // Prepare the email message
    const mailOptions = {
      from: email,
      to: "your-email@example.com", // Your contact email where submissions will go
      subject: `Contact Form Submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    // Send success response
    res.status(200).send("Message sent successfully. We will get back to you soon.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error sending message. Please try again later.");
  }
};

module.exports = {
  getContact,
  submitContactForm,
};
