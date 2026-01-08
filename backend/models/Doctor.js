const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  specialization: {
    type: String,
    required: true,
    trim: true
  },
  experience: {
    type: Number,
    required: true
  },
  rating: {
    type: Number,
    default: 0
  },
  reviews: {
    type: Number,
    default: 0
  },
  availability: {
    type: Boolean,
    default: true
  },
  avatar: {
    type: String,
    default: 'https://randomuser.me/api/portraits/men/1.jpg'
  },
  bio: {
    type: String,
    trim: true
  },
  education: [{
    type: String,
    trim: true
  }],
  languages: [{
    type: String,
    trim: true
  }],
  consultationFee: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Doctor', doctorSchema); 