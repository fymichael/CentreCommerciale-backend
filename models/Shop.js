const mongoose = require('mongoose');

const ShopSchema = new mongoose.Schema({
  proprioName: String,
  name: String,
  description: String,
  fiscal_number: String,
  logo: String,
  email: String,
  password: String,
  contact: String,
  address: String,
  
  price_in_month: Number,

  state: { type: Number }
}, { timestamps: true });

module.exports = mongoose.model('Shop', ShopSchema);