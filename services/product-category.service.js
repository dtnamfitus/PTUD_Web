const ProductCategoryModel = require("../models/product-category.model");

const getProductCategories = async () => {
  try {
    const productCategories = await ProductCategoryModel.find({});
    return productCategories;
  } catch (err) {
    throw new Error("Error fetching product categories: " + err.message);
  }
};

const addCategory = async (categoryData) => {
  try {
    const category = await ProductCategoryModel.create(categoryData);
    return category;
  } catch (err) {
    throw new Error("Error adding category: " + err.message);
  }
}

const updateCategory = async (categoryId, categoryData) => {
  try {
    const category = await ProductCategoryModel.findByIdAndUpdate
      (categoryId, categoryData, { new: true });
    return category;
  } catch (err) {
    throw new Error("Error updating category: " + err.message);
  }
}

const deleteCategory = async (categoryId) => {
  try {
    const category = await ProductCategoryModel.findByIdAndDelete(categoryId);
    return category;
  } catch (err) {
    throw new Error("Error deleting category: " + err.message);
  }
}

module.exports = {
  getProductCategories,
  addCategory,
  updateCategory,
  deleteCategory,
};
