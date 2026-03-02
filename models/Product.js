const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  code: { type: String, unique: true },
  name: String,
  description: String,

  unit_price: Number, // prix de vente
  discount_rate: Number,

  stock_quantity: { type: Number, default: 0 },
  average_cost: { type: Number, default: 0 }, // CUMP
  stock_value: { type: Number, default: 0 },  // total valeur stock

  shop_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop' },
  category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },

  image: String,
  color: String,
  build_material: String,
  quality: String,
  variant: String,
  state: { type: Number }
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);