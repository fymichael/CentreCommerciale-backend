const Invoice = require('../models/Invoice');
require('../models/Product');
const mongoose = require('mongoose');

class InvoiceService {

  async create(data) {
    return await Invoice.create(data);
  }

  async findAll() {
    return await Invoice.find();
  }

  async findById(id) {
    return await Invoice.findById(id);
  }

  async findByIdUser(idUser) {
    return await Invoice.find({ user_id: idUser })
                        .populate('product_id')
                        .populate('user_id')
                        .populate({ path: 'product_id', populate: { path: 'category_id' } })
                        .populate({ path: 'product_id', populate: { path: 'shop_id' } });
  }

  async findByIdShop(idShop) {
    const products = await mongoose.model('Product').find({ shop_id: idShop }).select('_id');
    const productIds = products.map(p => p._id);

    return await Invoice.find({ "product_id": { $in: productIds } })
                        .populate('product_id')
                        .populate('user_id')
                        .populate({ path: 'product_id', populate: { path: 'category_id' } })
                        .populate({ path: 'product_id', populate: { path: 'shop_id' } });
  }

  async getNextReference() {
    const lastInvoice = await Invoice.findOne().sort({ createdAt: -1 });
    if (!lastInvoice) {
      return 'ORD-0001';
    }

    const lastRef = lastInvoice.reference;
    const lastNumber = parseInt(lastRef.split('-')[1]);
    const nextNumber = (lastNumber + 1).toString().padStart(4, '0');
    return `ORD-${nextNumber}`;
  }

  async update(id, data) {
    return await Invoice.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    return await Invoice.findByIdAndDelete(id);
  }
}

module.exports = new InvoiceService();
