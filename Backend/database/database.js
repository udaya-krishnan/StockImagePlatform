const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(
       "mongodb+srv://udayankrishnan36:jiOA7dyJ1NonipTl@stockimageplatform.gg1we.mongodb.net/StockImageplatform?retryWrites=true&w=majority&appName=StockimagePlatform",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        tls: true, // Ensure TLS is enabled
      }
    );
    console.log('Database connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1); // Exit the application if DB connection fails
  }
};

module.exports = connectDB;
