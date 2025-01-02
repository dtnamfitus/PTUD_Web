const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const productCategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true  },
    description: { type: String, default: "" },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true }
);

productCategorySchema.plugin(mongoosePaginate);
productCategorySchema.pre("remove", async function (next) {
  await mongoose
    .model("Product")
    .updateMany({ categories: this._id }, { $pull: { categories: this._id } });
  next();
});

module.exports = mongoose.model("ProductCategory", productCategorySchema);
