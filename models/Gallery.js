// models/Gallery.js
const mongoose = require('mongoose');

const gallerySchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      default: 'Uncategorized'
    },
    imageUrl: {
      type: String,
      required: true,
    },
    // uploadedBy: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    //   ref: 'User',
    // },
  },
  {
    timestamps: true,
  }
);

const Gallery = mongoose.model('Gallery', gallerySchema);

module.exports = Gallery;