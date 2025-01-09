const express = require("express");
const router = express.Router();
const uiProductController = require("../../controllers/product.controller");

router.get("/", uiProductController.getProducts);
router.get("/:id", uiProductController.getProductDetails);

module.exports = router;
