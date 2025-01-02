const express = require("express");

const router = express.Router();

const homeUIRoute = require("./home.ui");
const productUIRoute = require("./product.ui");
const loginUIRoute = require("./auth.ui");
const cartUIRoute = require("./cart.ui");
const commentUIRoute = require("./comment.ui");
const profileUIRoute = require("./profile.ui");
const contactUIRoute = require("./contact.ui");
// const aboutUIRoute = require("./about.ui");
// const orderUIRoute = require("./order.ui");
// const paymentUIRoute = require("./payment.ui");
// const dashboardUIRoute = require("./dashboard.ui");
// const userUIRoute = require("./user.ui");
// const adminUIRoute = require("./admin.ui");
// const categoryUIRoute = require("./category.ui");

router.use("/product", productUIRoute);
router.use("/home", homeUIRoute);
router.use("/auth", loginUIRoute);
router.use("/cart", cartUIRoute);
router.use("/comment", commentUIRoute);
router.use("/profile", profileUIRoute);
router.use("/contact", contactUIRoute);

module.exports = router;
