// routes/recipeRoutes.js
const express = require('express');
const router = express.Router();
const { createRecipe, getRecipes, uploadMiddleware } = require('../controllers/recipeController');

// Define routes
router.post('/',  uploadMiddleware, createRecipe);
router.get('/',  getRecipes);

module.exports = router;