// routes/galleryRoutes.js
const express = require('express');
const router = express.Router();
const { 
  uploadImage, 
  getGalleryImages, 
  deleteGalleryImage,
  uploadMiddleware 
} = require('../controllers/galleryController');
const { protect } = require('../middlewares/authMiddleware');

// Get all gallery images
router.get('/', protect, getGalleryImages);

// Upload a new image
router.post('/upload', protect, uploadMiddleware, uploadImage);

// Delete a gallery image
router.delete('/:id', protect, deleteGalleryImage);

module.exports = router;