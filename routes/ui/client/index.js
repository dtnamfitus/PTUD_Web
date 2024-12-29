const express = require("express");

const router = express.Router();

const homeUIRoute = require("./home.ui");
const productUIRoute = require("./product.ui");
const loginUIRoute = require("./auth.ui");
const cartUIRoute = require("./cart.ui");
const commentUIRoute = require("./comment.ui");
const profileUIRoute = require("./profile.ui");

router.use("/product", productUIRoute);
router.use("/home", homeUIRoute);
router.use("/auth", loginUIRoute);
router.use("/cart", cartUIRoute);
router.use("/comment", commentUIRoute);
router.use("/profile", profileUIRoute);

module.exports = router;
