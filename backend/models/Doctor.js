const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  specialization: String,
  degree: String,
  location: String,
});

module.exports = mongoose.model('Doctor', doctorSchema);