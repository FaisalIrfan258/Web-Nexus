// models/Recipe.js
const mongoose = require('mongoose');

const recipeSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    ingredients: [{
      type: String,
      required: true,
    }],
    instructions: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;