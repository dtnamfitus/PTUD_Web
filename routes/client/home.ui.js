const express = require("express");
const router = express.Router();

const uiHomeController = require("../../controllers/home.controller");
router.get("/", uiHomeController.getHome);

module.exports = router;
