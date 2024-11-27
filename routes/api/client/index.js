const express = require("express");

const router = express.Router();

const productRoute = require("./product.api");
const productCategoryRoute = require("./productCategory.api");
const authRoute = require("./auth.api");

router.use("/product", productRoute);
router.use("/productCategory", productCategoryRoute);
router.use("/auth", authRoute);

module.exports = router;
