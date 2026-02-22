const Role = require('../models/Role');

class RoleService {

  async create(data) {
    return await Role.create(data);
  }

  async findAll() {
    return await Role.find();
  }

  async findById(id) {
    return await Role.findById(id);
  }

  async update(id, data) {
    return await Role.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    return await Role.findByIdAndDelete(id);
  }
}

module.exports = new RoleService();
