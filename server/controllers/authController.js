require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const signup = async (req, res) => {
  try {
    const { name, email, password, role, bio, phone, location } = req.body;
    
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already exists' });
    
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed, role, bio, phone, location });
    
    const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET || 'studio-secret-key', { expiresIn: '7d' });
    
    res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role, image: user.image } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: 'Invalid credentials' });
    
    const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET || 'studio-secret-key', { expiresIn: '7d' });
    
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role, image: user.image } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { signup, login };