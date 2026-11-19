const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const { authenticate } = require('../middleware/auth');

router.get('/my-bookings', authenticate, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id })
      .populate('studioId', 'name category images hourlyRate location city')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', authenticate, async (req, res) => {
  try {
    const { studioId, date, timeSlot, duration } = req.body;
    const studio = await require('../models/Studio').findById(studioId);
    if (!studio) return res.status(404).json({ message: 'Studio not found' });
    const totalPrice = studio.hourlyRate * duration;
    const booking = await Booking.create({ studioId, userId: req.user.id, date, timeSlot, duration, totalPrice, status: 'pending' });
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/:id/status', authenticate, async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { status },
      { new: true }
    );
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;