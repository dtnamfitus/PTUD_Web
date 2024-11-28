const ProductCategoryModel = require("../models/product-category.model");

const getProductCategories = async () => {
  try {
    const productCategories = await ProductCategoryModel.find({});
    return productCategories;
  } catch (err) {
    throw new Error("Error fetching product categories: " + err.message);
  }
};

module.exports = {
  getProductCategories,
};
