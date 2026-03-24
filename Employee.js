const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  empID: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  empName: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: Number,
    required: true,
    min: 18,
    max: 65
  },
  designation: {
    type: String,
    required: true,
    trim: true
  },
  salary: {
    type: Number,
    required: true,
    min: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Employee', employeeSchema);