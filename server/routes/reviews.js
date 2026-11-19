const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const Studio = require('../models/Studio');
const { authenticate } = require('../middleware/auth');

router.post('/', authenticate, async (req, res) => {
  try {
    const { studioId, rating, comment } = req.body;
    const review = await Review.create({
      studioId,
      userId: req.user.id,
      userName: req.user.name,
      rating,
      comment
    });
    
    const reviews = await Review.find({ studioId });
    const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    await Studio.findByIdAndUpdate(studioId, { rating: avgRating, reviewCount: reviews.length });
    
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:studioId', async (req, res) => {
  try {
    const reviews = await Review.find({ studioId: req.params.studioId }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;