const mongoose = require('mongoose');

const SubscriptionShopSchema = new mongoose.Schema({
  reference: String,

  shop_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop' },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

  price: Number,
  state: String
}, { timestamps: true });

module.exports = mongoose.model('SubscriptionShop', SubscriptionShopSchema);
