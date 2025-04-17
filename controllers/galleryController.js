// controllers/galleryController.js
const Gallery = require('../models/Gallery');
const { cloudinary } = require('../config/cloudinary');
const multer = require('multer');

// Set up multer storage
const storage = multer.memoryStorage();
const upload = multer({ storage });
const uploadMiddleware = upload.single('image');

// @desc    Upload image to gallery
// @route   POST /api/gallery/upload
// @access  Private
const uploadImage = async (req, res) => {
  try {
    console.log("Request body:", req.body); // Debug the request body
    const { title, category } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload an image' });
    }

    // Provide default values if fields are missing
    const imageTitle = title || 'Untitled';
    const imageCategory = category || 'Uncategorized';

    // Convert buffer to base64 data URI for Cloudinary
    const dataUri = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
    
    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(dataUri, {
      folder: 'web-nexus/gallery',
    });

    // Create new gallery entry
    const galleryItem = await Gallery.create({
      title: imageTitle,
      category: imageCategory,
      imageUrl: result.secure_url,
      uploadedBy: req.user._id,
    });

    res.status(201).json(galleryItem);
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message,
      stack: process.env.NODE_ENV === 'production' ? null : error.stack
    });
  }
};

// @desc    Get all gallery images
// @route   GET /api/gallery
// @access  Private
const getGalleryImages = async (req, res) => {
  try {
    const galleryItems = await Gallery.find().sort({ createdAt: -1 });
    res.json(galleryItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete a gallery image
// @route   DELETE /api/gallery/:id
// @access  Private
const deleteGalleryImage = async (req, res) => {
  try {
    const galleryItem = await Gallery.findById(req.params.id);

    if (!galleryItem) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }

    // Check if user owns the gallery item
    if (galleryItem.uploadedBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    // Extract public_id from Cloudinary URL to delete the image
    const urlParts = galleryItem.imageUrl.split('/');
    const fileName = urlParts[urlParts.length - 1];
    const publicId = `web-nexus/gallery/${fileName.split('.')[0]}`;

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(publicId);

    // Delete from database
    await galleryItem.remove();

    res.json({ message: 'Gallery item removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { 
  uploadImage, 
  getGalleryImages, 
  deleteGalleryImage,
  uploadMiddleware 
};