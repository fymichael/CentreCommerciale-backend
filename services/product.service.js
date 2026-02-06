const Product = require('../models/Product');

class ProductService {

  async create(data) {
    return await Product.create(data);
  }

  async findAll() {
    return await Product.find()
      .populate('shop_id')
      .populate('category_id');
  }

  async findById(id) {
    return await Product.findById(id)
      .populate('shop_id')
      .populate('category_id');
  }

  async update(id, data) {
    return await Product.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    return await Product.findByIdAndDelete(id);
  }
}

module.exports = new ProductService();
