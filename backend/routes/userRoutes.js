const express = require('express');
const router = express.Router();
const User = require('../models/User');

// ✅ Get user details by ID (excluding password & reset tokens)
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password -resetToken -resetTokenExpiry');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error('Fetch user error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ Update user profile photo
router.put('/:id/photo', async (req, res) => {
  const { image } = req.body;

  if (!image) {
    return res.status(400).json({ message: 'Image is required' });
  }

  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { image },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      message: 'Profile image updated successfully',
      user,
    });
  } catch (err) {
    console.error('Update photo error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ Update user profile info (name, email, phone, gender, dob)
router.put('/:id', async (req, res) => {
  const { name, email, phone, gender, dob } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, phone, gender, dob },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      message: 'Profile updated successfully',
      user: updatedUser,
    });
  } catch (err) {
    console.error('Update profile error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
