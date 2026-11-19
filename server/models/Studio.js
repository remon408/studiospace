const mongoose = require('mongoose');

const studioSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, enum: ['photo', 'sound', 'podcast', 'music', 'art', 'video', 'dance', 'other'], required: true },
  subCategory: { type: String },
  location: { type: String, required: true },
  city: { type: String, required: true },
  hourlyRate: { type: Number, required: true },
  rating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
  images: [{ type: String }],
  amenities: [{ type: String }],
  capacity: { type: Number, required: true },
  availableSlots: [{ date: String, slots: [{ time: String, available: Boolean }] }],
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('Studio', studioSchema);