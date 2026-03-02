const mongoose = require('mongoose');

const SubscriptionShopSchema = new mongoose.Schema({
  reference: { 
    type: String, 
    unique: true 
  },

  shop_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop' },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

  price: Number,
  state: Number
}, { timestamps: true });

module.exports = mongoose.model('SubscriptionShop', SubscriptionShopSchema);