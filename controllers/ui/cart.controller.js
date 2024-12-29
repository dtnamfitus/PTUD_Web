const cartService = require("../../services/cart.service");

const getCart = async (req, res) => {
  try {
    const user = req.user;
    const cart = await cartService.getCartByUserId(user._id);
    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching cart");
  }
};

const addToCart = async (req, res) => {
  try {
    const user = req.user;
    const productId = req.body.productId;
    const quantity = req.body.quantity;
    const cart = await cartService.addToCart(user._id, productId, quantity);
    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error adding to cart");
  }
};

const removeFromCart = async (req, res) => {
  try {
    const user = req.user;
    const productId = req.body.productId;
    const cart = await cartService.removeFromCart(user._id, productId);
    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error removing from cart");
  }
};

const updateCart = async (req, res) => {
  try {
    const user = req.user;
    const productId = req.body.productId;
    const quantity = req.body.quantity;
    const cart = await cartService.updateProductQuantity(
      user._id,
      productId,
      quantity
    );
    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating cart");
  }
};

module.exports = {
  getCart,
  addToCart,
  removeFromCart,
  updateCart,
};
