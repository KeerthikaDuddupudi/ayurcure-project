// routes/doctors.js
const express = require("express");
const router = express.Router();
const Doctor = require("../models/Doctor");

// GET all doctors
router.get("/", async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// ✅ GET a single doctor by ID
router.get("/:id", async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // ✅ Return doctor details including email
    res.json({
      name: doctor.name,
      email: doctor.email,
      degree: doctor.degree,
      specialization: doctor.specialization,
      location: doctor.location,
      phone: doctor.phone,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;