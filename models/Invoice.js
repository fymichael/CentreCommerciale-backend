const mongoose = require('mongoose');

const InvoiceSchema = new mongoose.Schema({
  reference: { type: String, unique: true },

  product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

  unit_price: Number,
  quantity: Number,

  state: String
}, { timestamps: true });

module.exports = mongoose.model('Invoice', InvoiceSchema);
