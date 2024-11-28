const mongoose = require("mongoose");
const colors = require("./../constant/color.constant");
const productType = require("./../constant/product-type.constant");
const shirtSizes = require("./../constant/shirt-size.constant");
const pantSizes = require("./../constant/pant-size.constant");
const shoeSizes = require("./../constant/shoe-size.constant");

const mongoosePaginate = require("mongoose-paginate-v2");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Product name is required."] },
    description: { type: String, default: "" },
    price: { type: Number, required: [true, "Product price is required."] },
    categories: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "ProductCategory",
        },
      ],
      required: [true, "At least one category is required."],
    },
    mainImage: { type: String, required: true },
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
    type: {
      type: String,
      enum: Object.values(productType),
      required: true,
    },
    size: {
      type: [String],
      validate: {
        validator: function (values) {
          if (!Array.isArray(values)) return false;
          return values.every((value) => {
            if (this.type === productType.TOP_WEAR) {
              return shirtSizes.hasOwnProperty(value);
            } else if (this.type === productType.BOTTOM_WEAR) {
              return pantSizes.includes(parseInt(value, 10));
            } else if (this.type === productType.FOOT_WEAR) {
              return shoeSizes.hasOwnProperty(parseInt(value, 10));
            } else if (this.type === productType.OUTER_WEAR) {
              return shirtSizes.hasOwnProperty(value);
            }
            return true;
          });
        },
        message: (props) =>
          `Invalid size(s) for the selected type: ${props.value.join(", ")}.`,
      },
    },
  },
  { timestamps: true }
);

productSchema.index({ name: "text", type: 1 });
productSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Product", productSchema);
