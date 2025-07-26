const express = require('express');
const router = express.Router();
const SavedRemedy = require('../models/SavedRemedy');

// Save a remedy
router.post('/save', async (req, res) => {
  try {
    const { email, remedyName, category, ingredients, instructions } = req.body;

    if (!email || !remedyName || !category || !instructions) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newRemedy = new SavedRemedy({
      email,
      remedyName,
      category,
      ingredients,
      instructions
    });

    const saved = await newRemedy.save();
    res.status(201).json({ message: 'Remedy saved', saved });
  } catch (err) {
    console.error('Error saving remedy:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get remedies by user email
router.get('/user/:email', async (req, res) => {
  try {
    const userEmail = req.params.email;
    const remedies = await SavedRemedy.find({ email: userEmail }).sort({ createdAt: -1 });
    res.json(remedies);
  } catch (err) {
    console.error('Error fetching remedies:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
