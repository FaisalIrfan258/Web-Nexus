// server.js - Entry point
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('../backend/config/db');

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('../backend/routes/authRoutes'));
app.use('/api/gallery', require('../backend/routes/galleryRoutes'));
app.use('/api/journals', require('../backend/routes/journalRoutes'));
app.use('/api/recipes', require('../backend/routes/recipeRoutes'));
app.use('/api/contact', require('../backend/routes/contactRoutes'));

// Base route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to WEB NEXUS API' });
});

// Port configuration
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
