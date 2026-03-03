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

  async getTotalOrdersByYear(year) {

    const startDate = new Date(`${year}-01-01`);
    const endDate = new Date(`${year}-12-31T23:59:59`);

    const ordersData = await Invoice.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate, $lte: endDate },
          state: 5
        }
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          totalOrders: { $sum: 1 }
        }
      }
    ]);

    // Initialiser 12 mois à 0
    const months = Array.from({ length: 12 }, (_, i) => ({
      month: i + 1,
      totalOrders: 0
    }));

    // Injecter les vraies valeurs
    ordersData.forEach(item => {
      const index = item._id - 1;
      months[index].totalOrders = item.totalOrders;
    });

      return months;
  }
}

module.exports = new InvoiceService();
