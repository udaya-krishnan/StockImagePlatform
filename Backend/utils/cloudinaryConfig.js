// cloudinaryConfig.js
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'duppr5j5k', // Replace with your Cloud Name
  api_key: '543913585834857',       // Replace with your API Key
  api_secret: 'gAyDnCm0s2NB_yvCd8YntQjDKo8', // Replace with your API Secret
});

module.exports = cloudinary;
