const express = require("express");
const {
  createAppointment,
  confirmAppointmentTime,
} = require("../controllers/appointmentController");

const router = express.Router();

// 1. Book appointment
router.post("/", createAppointment);

// 2. Doctor clicks confirmation link
router.get("/confirm", confirmAppointmentTime);

module.exports = router;