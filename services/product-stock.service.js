const { default: mongoose } = require("mongoose");
const ProductStock = require("../models/product-stock.model");

const getProductStockByQuery = async (query) => {
  try {
    // Ensure the product ID is a valid string before converting it to ObjectId
    if (!mongoose.Types.ObjectId.isValid(query.product)) {
      throw new Error(`Invalid product ID: ${query.product}`);
    }

    const productId = new mongoose.Types.ObjectId(query.product);

    const productStock = await ProductStock.findOne({
      product: productId,
      ...query,
    });

    return productStock;
  } catch (err) {
    throw new Error("Error fetching product stock: " + err.message);
  }
};

const updateProductStock = async (query, update) => {
  try {
    const productStock = await ProductStock.findOneAndUpdate(query, update);
    return productStock;
  } catch (err) {
    throw new Error("Error updating product stock: " + err.message);
  }
};

module.exports = {
  getProductStockByQuery,
  updateProductStock,
};
