// controllers/recipeController.js
const Recipe = require('../models/Recipe');
const { cloudinary } = require('../config/cloudinary');
const multer = require('multer');

// Set up multer storage
const storage = multer.memoryStorage();
const upload = multer({ storage });
const uploadMiddleware = upload.single('image');

// @desc    Create a new recipe
// @route   POST /api/recipes
// @access  Private
const createRecipe = async (req, res) => {
  try {
    const { title, ingredients, instructions } = req.body;
    
    let imageUrl = '';
    
    // Upload image to Cloudinary if provided
    if (req.file) {
      // Convert buffer to base64 data URI for Cloudinary
      const dataUri = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
      
      // Upload to Cloudinary
      const result = await cloudinary.uploader.upload(dataUri, {
        folder: 'web-nexus/recipes',
      });
      
      imageUrl = result.secure_url;
    }

    // Parse ingredients if it's a string
    let parsedIngredients = ingredients;
    if (typeof ingredients === 'string') {
      parsedIngredients = ingredients.split(',').map(item => item.trim());
    }

    const recipe = await Recipe.create({
      title,
      ingredients: parsedIngredients,
      instructions,
      imageUrl,
      createdBy: req.user._id,
    });

    res.status(201).json(recipe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get all recipes
// @route   GET /api/recipes
// @access  Private
const getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({ createdBy: req.user._id }).sort({ createdAt: -1 });
    res.json(recipes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { createRecipe, getRecipes, uploadMiddleware };