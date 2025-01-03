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
    console.log(newCart);
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

const updateProductQuantity = async (userId, productId, quantity) => {
  try {
    if (quantity <= 0) {
      throw new Error("Quantity must be greater than 0");
    }
    const cart = await getCartByUserId(userId);
    const productIndex = cart.products.findIndex(
      (product) => product._product.toString() === productId
    );
    if (productIndex === -1) {
      throw new Error("Product not found in cart");
    }
    cart.products[productIndex].quantity = quantity;
    return await cart.save();
  } catch (err) {
    throw new Error("Error updating product quantity: " + err.message);
  }
};

module.exports = {
  getCartByUserId,
  addToCart,
  removeFromCart,
  updateProductQuantity,
};
