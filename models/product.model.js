const mongoose = require("mongoose");
const colors = require("./../constant/color.constant");
const mongoosePaginate = require("mongoose-paginate-v2");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: "" },
    price: { type: Number, required: true },
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProductCategory",
        required: true,
      },
    ],
    main_image: { type: String, required: true },
    colors: [
      {
        color_name: {
          type: String,
          enum: Object.values(colors),
          required: true,
        },
        images: [{ type: String, required: true }],
      },
    ],
  },
  { timestamps: true }
);

productSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Product", productSchema);
