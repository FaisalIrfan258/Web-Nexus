// controllers/journalController.js
const Journal = require('../models/Journal');

// @desc    Create a new journal
// @route   POST /api/journals
// @access  Private
const createJournal = async (req, res) => {
  try {
    const { title, content, tags, date } = req.body;

    const journal = await Journal.create({
      title,
      content,
      tags: tags || [],
      date: date || new Date(),
      createdBy: req.user._id,
    });

    res.status(201).json(journal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all journals
// @route   GET /api/journals
// @access  Private
const getJournals = async (req, res) => {
  try {
    const journals = await Journal.find({ createdBy: req.user._id }).sort({ date: -1 });
    res.json(journals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete a journal
// @route   DELETE /api/journals/:id
// @access  Private
const deleteJournal = async (req, res) => {
  try {
    const journal = await Journal.findById(req.params.id);

    if (!journal) {
      return res.status(404).json({ message: 'Journal not found' });
    }

    // Check if user owns the journal
    if (journal.createdBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    await journal.remove();
    res.json({ message: 'Journal removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createJournal, getJournals, deleteJournal };