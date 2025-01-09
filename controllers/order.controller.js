const orderService = require("../services/order.service");
const cartService = require("../services/cart.service");
const productService = require("../services/product.service");
const renderLayout = require("./renderLayout");
const nominatimService = require("../third_party/nominatim.service");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

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

const createCheckoutSession = async (req, res) => {
  const {
    calculateHaversine,
    shippingCostFee,
    total,
    city,
    address,
    district,
    ward,
  } = req.body;
  console.log(req.body);
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Order Payment",
            },
            unit_amount: Math.round(
              (Number.parseInt(total) + Number.parseInt(shippingCostFee)) * 100
            ),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      metadata: {
        userId: req.user._id.toString(),
        city,
        address,
        district,
        ward,
        shippingCostFee,
        total,
      },
      success_url: `${process.env.BASE_URL}/client/order/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.BASE_URL}/client/order/cancel`,
    });

    res.json({ sessionId: session.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create payment session" });
  }
};

const handleSuccess = async (req, res) => {
  const sessionId = req.query.session_id;
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === "paid") {
      const user = req.user;
      const { shippingCostFee, total, city, address, district, ward } =
        session.metadata;
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
          payment_method: session.payment_method_types[0],
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

      const bodyHtml = await new Promise((resolve, reject) => {
        res.render(
          "client/checkout/order-success",
          {
            session,
          },
          (err, html) => {
            if (err) return reject(err);
            resolve(html);
          }
        );
      });
      await renderLayout(req, res, bodyHtml, "Order Success");
    } else {
      res.redirect("/client/order/failure");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error processing success page");
  }
};

const cancel = async (req, res) => {
  res.render("order-cancel");
};

const stripeWebhookHandler = async (req, res) => {
  const sig = req.headers["stripe-signature"];

  try {
    const event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object;
        if (session.payment_status === "paid") {
          await orderService.createOrder({
            _user: session.metadata.userId,
            city: session.metadata.city,
            district: session.metadata.district,
            ward: session.metadata.ward,
            address: session.metadata.address,
            total: session.amount_total / 100,
            shipping_fee: session.metadata.shippingCostFee,
            payment_method: session.payment_method_types[0],
          });
        }
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.status(200).json({ received: true });
  } catch (err) {
    console.error(`⚠️  Webhook error: ${err.message}`);
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
};

module.exports = {
  checkout,
  placeOrder,
  getAllOrder,
  getOrderDetail,
  createCheckoutSession,
  handleSuccess,
  cancel,
  stripeWebhookHandler,
};
