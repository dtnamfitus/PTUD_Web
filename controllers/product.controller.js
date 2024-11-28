const productService = require("./../services/product.service");

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productService.getProductById(id);
    return product;
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts(req);
    return products;
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getProductById,
  getProducts,
};
