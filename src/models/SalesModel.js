const mongoose = require("mongoose");

const salesSchema = new mongoose.Schema({
  product: { type: String },
  department: { type: String },
  quantity: { type: Number },
  price: { type: Number },
  date: { type: Date }
},{timestamps: true, versionKey: false});

const Sale = mongoose.model("Sale", salesSchema);

module.exports = Sale