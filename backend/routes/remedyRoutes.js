const express = require('express');
const router = express.Router();
const { getRemediesByCategory } = require('../controllers/remedy');

// Route: GET /api/remedies/:category?lang=en
router.get('/:category', getRemediesByCategory);

module.exports = router;