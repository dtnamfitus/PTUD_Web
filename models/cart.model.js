const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const cartSchema = new mongoose.Schema({
  _user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  products: [
    {
      _product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: { type: Number, required: true },
    },
  ],
});

cartSchema.plugin(mongoosePaginate);
cartSchema.index({ _user: 1 }, { unique: true });
module.exports = mongoose.model("Cart", cartSchema);
