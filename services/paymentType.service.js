const PaymentType = require('../models/PaymentType');

class PaymentTypeService {

  async create(data) {
    return await PaymentType.create(data);
  }

  async findAll() {
    return await PaymentType.find();
  }

  async findById(id) {
    return await PaymentType.findById(id);
  }

  async update(id, data) {
    return await PaymentType.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    return await PaymentType.findByIdAndDelete(id);
  }
}

module.exports = new PaymentTypeService();
