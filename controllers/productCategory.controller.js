const productCategoryService = require("../services/product-category.service");

const getProductCategoryById = (req, res) => {
  try {
    const productCategory = productCategoryService.getProductCategoryById(
      req.params.id
    );
    res.status(200).json(productCategory);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching product category");
  }
};

const getProductCategories = (req, res) => {
  return "products";
};

module.exports = {
  getProductCategoryById,
  getProductCategories,
};
