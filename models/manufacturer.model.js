const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const manufacturerSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String },
},
    { timestamps: true }
);

manufacturerSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Manufacturer", manufacturerSchema);