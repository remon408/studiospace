const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  studioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Studio', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: String, required: true },
  timeSlot: { type: String, required: true },
  duration: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'confirmed', 'cancelled', 'completed'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);