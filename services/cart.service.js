const Cart = require("../models/cart.model");
const Product = require("../models/product.model");

const getCartByUserId = async (userId) => {
  try {
    const cart = await Cart.findOneAndUpdate(
      { _user: userId },
      { $setOnInsert: { _user: userId, products: [] } },
      { upsert: true, new: true }
    );
    return cart;
  } catch (err) {
    throw new Error("Error fetching cart: " + err.message);
  }
};

const addToCart = async (userId, productId, quantity) => {
  try {
    const product = await Product.findById(productId);
    if (!product) {
      throw new Error("Product not found");
    }
    const cart = await getCartByUserId(userId);
    const productIndex = cart.products.findIndex(
      (product) => product._product.toString() === productId
    );
    if (productIndex === -1) {
      cart.products.push({ _product: productId, quantity });
    } else {
      cart.products[productIndex].quantity += quantity;
    }
    await cart.save();
    return cart;
  } catch (err) {
    throw new Error("Error adding to cart: " + err.message);
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
