const mongoose = require('mongoose');

// Define the image upload schema
const imageUploadSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  imagePath: {
    type: String, 
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
}, { versionKey: false, timestamps: true });

module.exports = mongoose.model('Image', imageUploadSchema);
