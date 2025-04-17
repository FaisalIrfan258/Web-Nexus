// routes/galleryRoutes.js
const express = require('express');
const router = express.Router();
const { 
  uploadImage, 
  getGalleryImages, 
  deleteGalleryImage,
  uploadMiddleware 
} = require('../controllers/galleryController');

// Get all gallery images
router.get('/',  getGalleryImages);

// Upload a new image
router.post('/upload',  uploadMiddleware, uploadImage);

// Delete a gallery image
router.delete('/:id',  deleteGalleryImage);

module.exports = router;