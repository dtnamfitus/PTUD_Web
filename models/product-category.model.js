const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const productCategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: "" },
  },
  { timestamps: true }
);

productCategorySchema.plugin(mongoosePaginate);

module.exports = mongoose.model("ProductCategory", productCategorySchema);
