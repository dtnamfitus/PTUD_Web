const mongoose = require("mongoose");
const colors = require('./../constant/color.constant');

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: "" },
    price: { type: Number, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    colors: [
      {
        colorName: { type: String, enum: Object.keys(colors), required: true },
        images: [
          { type: String, required: true }
        ]
      }
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
