const express = require("express");

const router = express.Router();

const productCategoryController = require('../../../controllers/productCategory.controller');

router.get('/:id', productCategoryController.getProductCategoryById)
router.get('', productCategoryController.getProductCategories)

module.exports = router;