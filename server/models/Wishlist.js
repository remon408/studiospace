const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  studioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Studio', required: true },
  createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

wishlistSchema.index({ userId: 1, studioId: 1 }, { unique: true });

module.exports = mongoose.model('Wishlist', wishlistSchema);