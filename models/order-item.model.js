const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const orderItemSchema = new mongoose.Schema({
  _order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true,
  },
  _product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  color_name: { type: String, required: true },
  size: { type: String, required: true },
});

orderItemSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("OrderItem", orderItemSchema);
