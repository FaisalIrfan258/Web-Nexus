// models/Journal.js
const mongoose = require('mongoose');

const journalSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    tags: [{
      type: String
    }],
    date: {
      type: Date,
      default: Date.now,
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

const Journal = mongoose.model('Journal', journalSchema);

module.exports = Journal;   