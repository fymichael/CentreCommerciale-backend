const mongoose = require('mongoose');

const StorageSchema = new mongoose.Schema({
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },

  quantity_in: Number,
  quantity_out: Number,

  date_in: Date,
  date_out: Date
}, { timestamps: true });

module.exports = mongoose.model('Storage', StorageSchema);
