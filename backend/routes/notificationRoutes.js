const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notificationController");

// Updated route to handle dynamic email
router.get("/:email", notificationController.getNotifications);
router.delete("/:id", notificationController.deleteNotification);

module.exports = router;