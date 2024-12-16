const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['student', 'staff', 'admin', 'manager'],
    required: true
  },
  personalInfo: {
    firstName: String,
    lastName: String,
    phone: String,
    address: String
  },
  // Additional information for staff
  staffInfo: {
    joinDate: Date,
    subjects: [String],
    class: String
  },
  // Additional information for student
  studentInfo: {
    admissionDate: Date,
    course: String
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);