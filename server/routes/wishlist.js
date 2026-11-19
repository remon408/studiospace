const express = require('express');
const router = express.Router();
const Wishlist = require('../models/Wishlist');
const { authenticate } = require('../middleware/auth');

router.get('/my-wishlist', authenticate, async (req, res) => {
  try {
    const items = await Wishlist.find({ userId: req.user.id }).populate('studioId');
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/add', authenticate, async (req, res) => {
  try {
    const { studioId } = req.body;
    const existing = await Wishlist.findOne({ userId: req.user.id, studioId });
    if (existing) return res.status(400).json({ message: 'Already in wishlist' });
    const item = await Wishlist.create({ userId: req.user.id, studioId });
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/:studioId', authenticate, async (req, res) => {
  try {
    await Wishlist.findOneAndDelete({ userId: req.user.id, studioId: req.params.studioId });
    res.json({ message: 'Removed from wishlist' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;