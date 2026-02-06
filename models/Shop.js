const mongoose = require('mongoose');

const ShopSchema = new mongoose.Schema({
  name: String,
  description: String,
  price_in_month: Number,

  state: { type: Number, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Shop', ShopSchema);