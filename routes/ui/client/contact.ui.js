const express = require("express");
const router = express.Router();
const uicontactController = require("../../../controllers/ui/contact.controller");

// Route to display the contact form page
router.get("/", uicontactController.getContact);

// Route to handle the form submission
router.post("/submit", uicontactController.submitContactForm);

module.exports = router;
