const express = require("express");

const router = express.Router();

const homeUIRoute = require("./home.ui");
const productUIRoute = require("./product.ui");
const loginUIRoute = require("./auth.ui");

router.use("/product", productUIRoute);
router.use("/home", homeUIRoute);
router.use("/auth", loginUIRoute);

module.exports = router;
