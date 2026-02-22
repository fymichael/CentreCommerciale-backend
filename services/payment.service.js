const Payment = require('../models/Payment');

class PaymentService {

  async create(data) {
    return await Payment.create(data);
  }

  async findAll() {
    return await Payment.find();
  }

  async findById(id) {
    return await Payment.findById(id);
  }

  async update(id, data) {
    return await Payment.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    return await Payment.findByIdAndDelete(id);
  }
}

module.exports = new PaymentService();
