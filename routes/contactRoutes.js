// routes/contactRoutes.js
const express = require('express');
const router = express.Router();
const { submitContactForm, getContactSubmissions } = require('../controllers/contactController');

// Submit contact form (public)
router.post('/', submitContactForm);

// Get all contact submissions (protected)
router.get('/', getContactSubmissions);

module.exports = router;