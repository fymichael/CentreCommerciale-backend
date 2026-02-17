const Invoice = require('../models/Invoice');

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

  async update(id, data) {
    return await Invoice.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    return await Invoice.findByIdAndDelete(id);
  }
}

module.exports = new InvoiceService();
