const Order = require("../models/order.model");
const OrderItem = require("../models/order-item.model");

const createOrder = async (order) => {
  try {
    const newOrder = await Order.create(order);
    return newOrder;
  } catch (err) {
    throw new Error("Error creating order: " + err.message);
  }
};

const createOrderItemMany = async (orderItems) => {
  try {
    const newOrderItems = await OrderItem.insertMany(orderItems);
    return newOrderItems;
  } catch (err) {
    throw new Error("Error creating order items: " + err.message);
  }
};

const getOrderByUserId = async (userId) => {
  try {
    const orders = await Order.find({ _user: userId });
    return orders;
  } catch (err) {
    throw new Error("Error getting orders: " + err.message);
  }
};

const getOrderByQuery = async (query) => {
  try {
    const order = await Order.findOne(query);
    return order;
  } catch (err) {
    throw new Error("Error getting order: " + err.message);
  }
};

const getOrderItemByOrderId = async (orderId) => {
  try {
    const orderItems = await OrderItem.find({ _order: orderId })
      .populate("_product")
      .lean();
    return orderItems;
  } catch (err) {
    throw new Error("Error getting order items: " + err.message);
  }
};

module.exports = {
  createOrder,
  createOrderItemMany,
  getOrderByUserId,
  getOrderByQuery,
  getOrderItemByOrderId,
};
