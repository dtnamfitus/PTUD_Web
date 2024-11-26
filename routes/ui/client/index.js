const express = require('express');

const router = express.Router();

const productUIRoute = require('./product.ui');

router.use('/product', productUIRoute);

module.exports = router;