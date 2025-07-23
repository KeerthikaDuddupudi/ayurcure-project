const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, default: "" },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  gender: { type: String, enum: ["Male", "Female", "Other"], default: "" },
  dob: { type: Date, default: null },
  

  resetToken: String,
  resetTokenExpiry: Date
});

module.exports = mongoose.model("User", userSchema);
