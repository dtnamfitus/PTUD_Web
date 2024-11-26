const express = require("express");

const router = express.Router();

const productController = require('../../../controllers/product.controller');

router.get('/:id', productController.getProductById)
router.get('', productController.getProducts)

module.exports = router;