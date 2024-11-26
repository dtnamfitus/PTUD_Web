const express = require('express');

const router = express.Router();

const productRoute = require('./product.api');
const productCategoryRoute = require('./productCategory.api');

router.use('/product', productRoute);
router.use('/productCategory', productCategoryRoute);

module.exports = router;