// controllers/notificationController.js

const Notification = require("../models/Notification"); // or however you named your model

exports.getNotifications = async (req, res) => {
  try {
    const email = req.params.email;
    const notifications = await Notification.find({ email }); // adjust if schema differs
    res.status(200).json(notifications);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.deleteNotification = async (req, res) => {
  try {
    const deleted = await Notification.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Notification not found" });
    }
    res.status(200).json({ message: "Notification deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};