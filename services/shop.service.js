const Shop = require('../models/Shop');
const SubscriptionShop = require('../models/SubscriptionShop');

class ShopService {

  async create(data) {
    return await Shop.create(data);
  }

  async findAll(user) {
    if (user.role !== "Admin mall") {
      return Shop.findAll();
    }

    const subscriptionShops = SubscriptionShop
      .find({"user_id": user.id})
      .populate('shop_id');
    return await subscriptionShops.shop_id;
  }

  async findById(id) {
    return await Shop.findById(id);
  }

  async update(id, data) {
    return await Shop.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    return await Shop.findByIdAndDelete(id);
  }

  async findByState(state) {
    return await Shop.find({ state });
  }
}

module.exports = new ShopService();
