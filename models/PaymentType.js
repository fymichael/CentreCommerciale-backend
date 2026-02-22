const mongoose = require('mongoose');

const PaymentTypeSchema = new mongoose.Schema({
  name: String,
  image: String,
  state: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('PaymentType', PaymentTypeSchema);
