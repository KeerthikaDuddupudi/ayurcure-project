const express = require("express");

const {
  createAppointment,
  confirmAppointmentTime,
  getAppointmentsByEmail,
  deleteAppointment, // <-- ✅ Add this
} = require("../controllers/appointmentController");

const router = express.Router();

router.post("/", createAppointment);
router.get("/confirm", confirmAppointmentTime);
router.get("/user/:email", getAppointmentsByEmail);
router.delete("/:id", deleteAppointment); // <-- ✅ New route for cancellation

module.exports = router;
