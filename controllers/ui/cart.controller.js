const cartService = require("../../services/cart.service");
const productService = require("../../services/product.service");
const productStockService = require("../../services/product-stock.service");

const renderLayout = require("./renderLayout");

const getCart = async (req, res) => {
  try {
    const user = req.user;
    const cart = await cartService.getCartByUserId(user._id);
    const formattedCart = cart.map((item) => {
      const mainImage = item._product.colors.find(
        (color) => color.color_name === item.color_name
      ).images[0];
      return {
        ...item,
        _product: {
          ...item._product,
          mainImage,
        },
      };
    });
    const subtotal = formattedCart.reduce(
      (acc, item) => acc + item._product.price * item.quantity,
      0
    );
    const bodyHtml = await new Promise((resolve, reject) => {
      res.render(
        "client/checkout/cart",
        { cart: formattedCart, subtotal },
        (err, html) => {
          if (err) return reject(err);
          resolve(html);
        }
      );
    });
    await renderLayout(req, res, bodyHtml, "Cart");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching cart");
  }
};

const addToCart = async (req, res) => {
  try {
    const { productId, selectedColor, selectedSize, quantity } = req.body;
    const user = req.user;

    // Fetch product and product stock simultaneously
    const [product, productStock] = await Promise.all([
      productService.getProductById(productId),
      productStockService.getProductStockByQuery({
        product: productId,
        color: selectedColor,
        size: selectedSize,
      }),
    ]);

    if (!product) {
      return res.json({ success: false, msg: "Product not found" });
    }

    if (!productStock) {
      return res.json({ success: false, msg: "Product stock not found" });
    }

    if (productStock.quantity < quantity) {
      return res.json({ success: false, msg: "Product out of stock" });
    }

    // Perform add to cart and stock update simultaneously
    const [cart, updatedStock] = await Promise.all([
      cartService.addToCart({
        userId: user._id,
        productId,
        selectedColor,
        selectedSize,
        quantity,
      }),
      // productStockService.updateProductStock(
      //   {
      //     product: productId,
      //     color: selectedColor,
      //     size: selectedSize,
      //   },
      //   {
      //     quantity: productStock.quantity - quantity,
      //   }
      // ),
      console.log("not updating stock"),
    ]);

    if (!cart) {
      // await productStockService.updateProductStock(
      //   {
      //     product: productId,
      //     color: selectedColor,
      //     size: selectedSize,
      //   },
      //   {
      //     quantity: productStock.quantity + quantity,
      //   }
      // );
      return res.json({ success: false, msg: "Product already in cart" });
    }

    return res.json({ success: true, msg: "Product added to cart" });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, msg: "Error adding to cart" });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const user = req.user;
    const { productId, color_name, size } = req.body;

    if (!productId || !color_name || !size) {
      return res.status(400).json({
        success: false,
        message: "Invalid request",
      });
    }
    const cart = await cartService.deleteOneCartByQuery({
      _user: user._id,
      _product: productId,
      color_name: color_name,
      size: size,
    });
    return res.json({
      success: true,
      message: "Product removed from cart",
      cart,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error removing product from cart",
    });
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

const updateProductQuantity = async (req, res) => {
  try {
    const user = req.user;
    const { productId, color_name, size, quantity } = req.body;

    if (!quantity || !productId || !color_name || !size) {
      return res.status(400).json({
        success: false,
        message: "Invalid request",
      });
    }
    if (quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be greater than 0",
      });
    }
    const cart = await cartService.updateProductByQuery(
      {
        _user: user._id,
        _product: productId,
        color_name: color_name,
        size: size,
      },
      { quantity: quantity }
    );
    return res.json({
      success: true,
      message: "Product quantity updated successfully",
      cart,
    });
  } catch (err) {
    throw new Error("Error updating product quantity: " + err.message);
  }
};

module.exports = {
  getCart,
  addToCart,
  removeFromCart,
  updateCart,
  updateProductQuantity,
};
