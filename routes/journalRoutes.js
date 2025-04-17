// routes/journalRoutes.js
const express = require('express');
const router = express.Router();
const { createJournal, getJournals, deleteJournal } = require('../controllers/journalController');

router.route('/').post( createJournal).get( getJournals);
router.route('/:id').delete( deleteJournal);

module.exports = router;