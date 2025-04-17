// routes/recipeRoutes.js
const express = require('express');
const router = express.Router();
const { createRecipe, getRecipes, uploadMiddleware } = require('../controllers/recipeController');
const { protect } = require('../middlewares/authMiddleware');

// Define routes
router.post('/', protect, uploadMiddleware, createRecipe);
router.get('/', protect, getRecipes);

module.exports = router;