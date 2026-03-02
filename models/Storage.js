const mongoose = require('mongoose');

const StorageSchema = new mongoose.Schema({
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },

  type: { 
    type: String, 
    enum: ['IN', 'OUT'], 
    required: true 
  },

  quantity: { type: Number, required: true },

  unit_cost: Number,

  total_cost: Number,

  date: { type: Date, default: Date.now }

}, { timestamps: true });

module.exports = mongoose.model('Storage', StorageSchema);