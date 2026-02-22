const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  role_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' },
  first_name: String,
  last_name: String,
  birthday: Date,

  username: { type: String, unique: true },
  password: String,

  contact: String,
  address: String,
  phone_number: String,

  state: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);