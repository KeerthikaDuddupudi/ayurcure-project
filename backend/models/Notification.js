// models/Notification.js
const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  email: String,
  message: String,
  
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Notification", notificationSchema);