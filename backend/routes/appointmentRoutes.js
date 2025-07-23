const express = require("express");
const {
  createAppointment,
  confirmAppointmentTime,
  getAppointmentsByEmail,
} = require("../controllers/appointmentController");

const router = express.Router();

router.post("/", createAppointment);
router.get("/confirm", confirmAppointmentTime);
router.get("/user/:email", getAppointmentsByEmail); // ✅

module.exports = router;
