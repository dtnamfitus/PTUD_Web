const express = require("express");

const router = express.Router();

const productUIRoute = require("./product.ui");
const homeUIRoute = require("./home.ui");

router.use("/product", productUIRoute);
router.use("/home", homeUIRoute);

module.exports = router;
