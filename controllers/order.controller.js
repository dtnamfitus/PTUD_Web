const orderService = require("../services/order.service");
const cartService = require("../services/cart.service");
const productService = require("../services/product.service");
const renderLayout = require("./renderLayout");
const nominatimService = require("../third_party/nominatim.service");

const checkout = async (req, res) => {
  try {
    const user = req.user;
    const { city, address, district, ward } = req.body;
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
    const total = cart.reduce(
      (acc, item) => acc + item._product.price * item.quantity,
      0
    );
    console.log(cart);
    const locationData = await nominatimService.search(`${district}, ${city}`);
    const weightKg = cart.reduce((acc, item) => acc + 0.5 * item.quantity, 0);

    const calculateHaversine = nominatimService.calculateHaversine(
      locationData[0].lat,
      locationData[0].lon
    );

    const shippingCostFee = nominatimService.calculateShippingCost(
      calculateHaversine,
      weightKg
    );

    const bodyHtml = await new Promise((resolve, reject) => {
      res.render(
        "client/checkout/checkout",
        {
          calculateHaversine,
          shippingCostFee,
          total,
          cart: formattedCart,
          city,
          address,
          district,
          ward,
        },
        (err, html) => {
          if (err) return reject(err);
          resolve(html);
        }
      );
    });

    await renderLayout(req, res, bodyHtml, "Checkout");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error processing order");
  }
};

const placeOrder = async (req, res) => {
  try {
    const user = req.user;
    const { shippingCostFee, total, city, address, district, ward } = req.body;

    const cart = await cartService.getCartByUserId(user._id);

    if (!cart.length) {
      return res.redirect("/client/cart");
    }

    const [order, products] = await Promise.all([
      orderService.createOrder({
        _user: user._id,
        city,
        district,
        ward,
        address,
        total,
        shipping_fee: shippingCostFee,
      }),
      productService.getProductByQuery({
        _id: { $in: cart.map((item) => item._product._id) },
      }),
    ]);

    const productMap = new Map(
      products.map((product) => [product._id.toString(), product])
    );

    const orderItems = cart.map((item) => {
      const productItem = productMap.get(item._product._id.toString());
      if (!productItem) {
        throw new Error(`Product not found for ID: ${item._product._id}`);
      }
      return {
        _order: order._id,
        _product: productItem._id,
        quantity: item.quantity,
        color_name: item.color_name,
        size: item.size,
        price: productItem.price,
      };
    });

    await Promise.all([
      orderService.createOrderItemMany(orderItems),
      cartService.deleteCartByUserId(user._id),
    ]);

    res.redirect(`/client/order/${order._id}?success=true`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error processing order");
  }
};

const getAllOrder = async (req, res) => {
  try {
    const user = req.user;
    const orders = await orderService.getOrderByUserId(user._id);
    const bodyHtml = await new Promise((resolve, reject) => {
      res.render(
        "client/checkout/order",
        {
          orders,
        },
        (err, html) => {
          if (err) return reject(err);
          resolve(html);
        }
      );
    });

    await renderLayout(req, res, bodyHtml, "Order");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error processing order");
  }
};

const getOrderDetail = async (req, res) => {
  try {
    const user = req.user;
    const { orderId } = req.params;
    const order = await orderService.getOrderByQuery({
      _id: orderId,
      _user: user._id,
    });
    const orderItems = await orderService.getOrderItemByOrderId(orderId);
    const formattedOrderItems = orderItems.map((item) => {
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
    console.log(order);
    console.log(formattedOrderItems);
    const bodyHtml = await new Promise((resolve, reject) => {
      res.render(
        "client/checkout/order-detail",
        {
          order,
          orderItems: formattedOrderItems,
        },
        (err, html) => {
          if (err) return reject(err);
          resolve(html);
        }
      );
    });

    await renderLayout(req, res, bodyHtml, "Order Detail");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error processing order");
  }
};

module.exports = {
  checkout,
  placeOrder,
  getAllOrder,
  getOrderDetail,
};
