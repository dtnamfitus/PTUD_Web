const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const ORDER_STATUS = require("./../constant/order-status.constant");

const orderSchema = new mongoose.Schema(
  {
    _user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    total: { type: Number, required: true },
    status: {
      type: String,
      enum: Object.values(ORDER_STATUS),
      default: "pending",
    },
  },
  { timestamps: true }
);

orderSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Order", orderSchema);
