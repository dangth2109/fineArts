const mongoose = require('mongoose');

const exhibitionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  location: String,
  submissions: [{
    submission: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Submission'
    },
    price: Number,
    status: {
      type: String,
      enum: ['available', 'sold', 'returned'],
      default: 'available'
    },
    soldPrice: Number,
    soldTo: {
      name: String,
      contact: String
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid'],
      default: 'pending'
    }
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true });

module.exports = mongoose.model('Exhibition', exhibitionSchema);