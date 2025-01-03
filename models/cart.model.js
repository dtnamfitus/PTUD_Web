const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const colors = require("./../constant/color.constant");

const cartSchema = new mongoose.Schema({
  _user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  _product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  color_name: {
    type: String,
    enum: Object.values(colors),
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

cartSchema.plugin(mongoosePaginate);

cartSchema.index(
  { _user: 1, _product: 1, color_name: 1, size: 1 },
  { unique: true }
);
module.exports = mongoose.model("Cart", cartSchema);
