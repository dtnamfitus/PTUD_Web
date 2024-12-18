const express = require("express");
const router = express.Router();
const productController = require("./../../../controllers/product.controller");
const productCategoriesController = require("./../../../controllers/productCategory.controller");
const uiHomeController = require("./../../../controllers/ui/home.controller");
router.get("/", uiHomeController.getHome);

module.exports = router;
