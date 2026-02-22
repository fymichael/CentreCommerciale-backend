const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  invoice_reference: String,
  payment_reference: String,

  type_payment: { type: mongoose.Schema.Types.ObjectId, ref: 'PaymentType' },
  date_payment: Date
}, { timestamps: true });

module.exports = mongoose.model('Payment', PaymentSchema);
