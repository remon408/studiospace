const express = require('express');
const router = express.Router();
const Studio = require('../models/Studio');
const { authenticate, authorize } = require('../middleware/auth');

router.get('/', async (req, res) => {
  try {
    const { category, city, search, page = 1, limit = 12, sortBy = 'rating' } = req.query;
    const filter = { isActive: true };
    
    if (category && category !== 'all') filter.category = category;
    if (city) filter.city = { $regex: city, $options: 'i' };
    if (search) filter.$or = [{ name: { $regex: search, $options: 'i' } }, { description: { $regex: search, $options: 'i' } }];
    
    const sortOptions = { rating: -1, hourlyRate: 1, createdAt: -1 };
    const studios = await Studio.find(filter).sort(sortOptions[sortBy] || -1)
      .skip((page - 1) * limit).limit(Number(limit))
      .populate('ownerId', 'name image location');
    
    const total = await Studio.countDocuments(filter);
    res.json({ studios, totalPages: Math.ceil(total / limit), currentPage: Number(page), total });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/featured', async (req, res) => {
  try {
    const studios = await Studio.find({ isActive: true }).sort({ rating: -1 }).limit(6);
    res.json(studios);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/categories', async (req, res) => {
  res.json({
    categories: [
      { id: 'photo', name: 'Photo Studios', description: 'Cyc walls, backdrops & professional lighting setups', count: 0 },
      { id: 'sound', name: 'Sound Stages', description: 'Cinema-grade sound stages with professional acoustics', count: 0 },
      { id: 'podcast', name: 'Podcast Rooms', description: 'Dedicated podcast lounges with recording equipment', count: 0 },
      { id: 'music', name: 'Music Suites', description: 'Recording suites with instruments & mixing consoles', count: 0 },
      { id: 'art', name: 'Art Workshops', description: 'Creative spaces for painting, sculpture & crafts', count: 0 },
      { id: 'video', name: 'Video Production', description: 'Full video production studios with editing bays', count: 0 },
      { id: 'dance', name: 'Dance Studios', description: 'Mirrored floors, barres & sound systems', count: 0 },
      { id: 'other', name: 'Other Spaces', description: 'Unique creative spaces not listed above', count: 0 }
    ]
  });
});

router.get('/:id', async (req, res) => {
  try {
    const studio = await Studio.findById(req.params.id).populate('ownerId', 'name email image phone location');
    if (!studio) return res.status(404).json({ message: 'Studio not found' });
    res.json(studio);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', authenticate, authorize('host'), async (req, res) => {
  try {
    const studio = await Studio.create({ ...req.body, ownerId: req.user.id });
    res.status(201).json(studio);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/:id', authenticate, async (req, res) => {
  try {
    const studio = await Studio.findOneAndUpdate({ _id: req.params.id, ownerId: req.user.id }, req.body, { new: true });
    if (!studio) return res.status(404).json({ message: 'Studio not found' });
    res.json(studio);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;