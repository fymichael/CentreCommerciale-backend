const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
 code: { type: String, unique: true },
  name: String,
  description: String,

  unit_price: Number,
  discount_rate: Number,

  shop_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop' },
  category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },

  image: String,
  state: { type: Number, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);
