// controllers/contactController.js
const Contact = require('../models/Contact');

// @desc    Submit a contact form
// @route   POST /api/contact
// @access  Public
const submitContactForm = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validate input
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Please provide name, email, and message' });
    }

    const contact = await Contact.create({
      name,
      email,
      message,
    });

    // Here you could add code to send an email notification
    // This is mocked for now

    res.status(201).json({
      success: true,
      message: 'Your message has been sent successfully',
      contact,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      message: 'Server error',
      error: error.message 
    });
  }
};

// @desc    Get all contact form submissions (admin only)
// @route   GET /api/contact
// @access  Private/Admin (if you implement admin roles later)
const getContactSubmissions = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { submitContactForm, getContactSubmissions };