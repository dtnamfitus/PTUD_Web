const Product = require('./../models/product.model');

const getAllProducts = async () => {
  try {
    const products = await Product.find().populate('category', 'name');
    return products;
  } catch (err) {
    throw new Error('Error fetching products: ' + err.message);
  }
};

const getProductById = async (id) => {
  try {
    const product = await Product.findById(id).populate('category', 'name');
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  } catch (err) {
    throw new Error('Error fetching product by ID: ' + err.message);
  }
};

module.exports = {
  getAllProducts,
  getProductById,
};
