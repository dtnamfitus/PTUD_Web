const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    gender: { type: String, required: true },
    birthDate: { type: Date, required: true },
    avatar: { type: String, default: null },
    isAdmin: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },
    otp: { type: String, select: false },
    otpExpiresAt: { type: Date, select: false },
    status: {
      type: String,
      enum: ["active", "banned"],
      default: "active", // trạng thái user
    },
  },
  { timestamps: true }
);

userSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("User", userSchema);
