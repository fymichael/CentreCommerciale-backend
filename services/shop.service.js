const Shop = require('../models/Shop');

class ShopService {

  async create(data) {
    return await Shop.create(data);
  }

  async findAll() {
    return await Shop.find();
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
}

module.exports = new ShopService();
