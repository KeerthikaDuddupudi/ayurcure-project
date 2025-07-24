// controllers/userController.js

const User = require('../models/User');

// Update profile image
exports.updateProfileImage = async (req, res) => {
  const { image } = req.body;
  const { id } = req.params;

  // Validation: Check if image URL/path is provided
  if (!image) {
    return res.status(400).json({ message: 'Image is required' });
  }

  try {
    // Update the user's image field
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { image },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({
      message: '✅ Profile image updated successfully',
      user: updatedUser,
    });
  } catch (error) {
    console.error('❌ Error updating profile image:', error.message);
    return res.status(500).json({ message: 'Server error' });
  }
};
