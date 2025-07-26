const express = require('express');
const router = express.Router();
const remedyController = require('../controllers/remedy');

// GET all remedies (with optional query filters)
// Example: /api/v1/remedies?category=cold%20and%20cough&plant=turmeric
router.get('/', remedyController.getAllRemedies);

// GET remedy by ID
router.get('/:id', remedyController.getRemedyById);

// GET remedies by category (alternative route)
// Example: /api/v1/remedies/category/cold%20and%20cough
router.get('/category/:category', remedyController.getByCategory);

// GET all unique categories
router.get('/categories/all', remedyController.getCategories);

// POST create new remedy
router.post('/', remedyController.createRemedy);

// PATCH update remedy
router.patch('/:id', remedyController.updateRemedy);

// DELETE remedy
router.delete('/:id', remedyController.deleteRemedy);

// POST endpoint for seeding (protected in production)
if (process.env.NODE_ENV !== 'production') {
  router.post('/seed', remedyController.seedRemedies);
}

module.exports = router;