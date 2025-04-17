// routes/journalRoutes.js
const express = require('express');
const router = express.Router();
const { createJournal, getJournals, deleteJournal } = require('../controllers/journalController');
const { protect } = require('../middlewares/authMiddleware');

router.route('/').post(protect, createJournal).get(protect, getJournals);
router.route('/:id').delete(protect, deleteJournal);

module.exports = router;