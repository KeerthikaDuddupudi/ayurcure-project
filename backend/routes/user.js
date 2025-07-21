const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/auth'); // ✅ correct path

// Handles GET /api/user/profile
router.get('/profile', authMiddleware, userController.getProfile);

module.exports = router;