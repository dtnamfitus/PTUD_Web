const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const commentSchema = new mongoose.Schema(
  {
    content: { type: String, require: true },
    rate: { type: Number },
    _user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    _product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  },
  { timestamps: true }
);

commentSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Comment", commentSchema);
