const mongoose = require("mongoose");
const colors = require("./../constant/color.constant");

const productStockSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    color: {
      type: String,
      enum: Object.values(colors),
      required: true,
    },
    size: { type: String, required: true },
    quantity: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);

productStockSchema.index({ product: 1, color: 1, size: 1 }, { unique: true });

module.exports = mongoose.model("ProductStock", productStockSchema);
