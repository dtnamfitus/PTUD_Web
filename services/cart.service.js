const { default: mongoose } = require("mongoose");
const Cart = require("../models/cart.model");

const getCartByUserId = async (userId) => {
  try {
    const cart = await Cart.find({ _user: userId }).populate("_product").lean();
    return cart;
  } catch (err) {
    throw new Error("Error fetching cart: " + err.message);
  }
};

const addToCart = async ({
  userId,
  productId,
  selectedColor,
  selectedSize,
  quantity,
}) => {
  try {
    const existingCartItem = await Cart.findOne({
      _user: userId,
      _product: productId,
      color_name: selectedColor,
      size: selectedSize,
    });
    if (existingCartItem) {
      throw new Error("Product already in cart");
    }
    const newCart = await Cart.create({
      _user: userId,
      _product: new mongoose.Types.ObjectId(productId),
      color_name: selectedColor,
      size: selectedSize,
      quantity: Number.parseInt(quantity),
    });
    return newCart.save();
  } catch (err) {
    console.log("Error adding to cart: " + err.message);
    return null;
  }
};

const removeFromCart = async (userId, productId) => {
  try {
    const cart = await getCartByUserId(userId);
    const productIndex = cart.products.findIndex(
      (product) => product._product.toString() === productId
    );
    if (productIndex === -1) {
      throw new Error("Product not found in cart");
    }
    cart.products.splice(productIndex, 1);
    return await cart.save();
  } catch (err) {
    throw new Error("Error removing from cart: " + err.message);
  }
};

const updateProductByQuery = async (query, update) => {
  try {
    return await Cart.findOneAndUpdate(query, update);
  } catch (err) {
    throw new Error("Error updating product: " + err.message);
  }
};

const deleteOneCartByQuery = async (query) => {
  try {
    return await Cart.deleteOne(query);
  } catch (err) {
    throw new Error("Error deleting cart: " + err.message);
  }
};

const deleteCartByUserId = async (userId) => {
  try {
    return await Cart.deleteMany({ _user: userId });
  } catch (err) {
    throw new Error("Error deleting cart: " + err.message);
  }
};

module.exports = {
  getCartByUserId,
  addToCart,
  removeFromCart,
  updateProductByQuery,
  deleteOneCartByQuery,
  deleteCartByUserId,
};
