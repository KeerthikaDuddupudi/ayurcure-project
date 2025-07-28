const express = require("express");
const router = express.Router();
const {
  saveRemedy,
  getRemedies,
  deleteRemedy,
} = require("../controllers/savedRemedyController");

// POST: Save a remedy
router.post("/save", saveRemedy);

// GET: Get all saved remedies for a user
router.get("/get", getRemedies);

// POST: Delete a saved remedy by ID
router.post("/delete", deleteRemedy);

module.exports = router;
