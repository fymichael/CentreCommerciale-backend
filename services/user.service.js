const User = require('../models/User');
const bcrypt = require('bcryptjs');

class UserService {

  async create(data) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    
    const user = await User.create({
      role_id: data.role_id,
      first_name: data.first_name,
      last_name: data.last_name,
      birthday: data.birthday,
      email: data.email,
      username: data.username,
      password: hashedPassword,
      contact: data.contact,
      address: data.address,
      phone_number: data.phone_number,
      state: data.state
    });
    
    return user;
  }

  async findAllWithFilters(queryParams) {
    const {
      search,
      role,
      state,
      createdFrom,
      createdTo,
      page = 1,
      limit = 10
    } = queryParams;

    const filter = {};

    // 🔎 Recherche globale
    if (search) {
      filter.$or = [
        { username: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { first_name: { $regex: search, $options: 'i' } },
        { last_name: { $regex: search, $options: 'i' } }
      ];
    }

    // 🎭 Filtre rôle
    if (role) {
      filter.role_id = role;
    }

    // 🟢 Filtre status
    if (state !== undefined && state !== '') {
      filter.state = Number(state);
    }

    // 📅 Filtre date création
    if (createdFrom || createdTo) {
      filter.createdAt = {};
      if (createdFrom) filter.createdAt.$gte = new Date(createdFrom);
      if (createdTo) filter.createdAt.$lte = new Date(createdTo);
    }

    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      User.find(filter)
        .populate('role_id')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit)),
      User.countDocuments(filter)
    ]);

    return {
      data: users,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit)
    };
  }

  async findAll() {
    return await User.find();
  }

  async findById(id) {
    return await User.findById(id).populate('role_id');
  }
  
  async update(id, data) {

    const user = await User.findById(id);
    if (!user) {
      throw new Error("Utilisateur introuvable");
    }

    // Si un nouveau mot de passe est envoyé
    if (data.password && data.password.trim() !== '') {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      data.password = hashedPassword;
    } else {
      // Sinon on ne modifie pas le password
      delete data.password;
    }

    return await User.findByIdAndUpdate(id, data, { new: true });
  }

  async updateState(id, newState) {
    const user = await User.findById(id);
    if (!user) throw new Error("Utilisateur introuvable");

    user.state = newState;
    await user.save();

    return user;
  }

  async delete(id) {
    return await User.findByIdAndDelete(id);
  }
}

module.exports = new UserService();
