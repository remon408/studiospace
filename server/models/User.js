const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String },
  role: { type: String, enum: ['creator', 'host', 'admin'], default: 'creator' },
  bio: { type: String },
  phone: { type: String },
  location: { type: String },
  subscription: { type: String, enum: ['free', 'pro', 'enterprise'], default: 'free' },
  createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);