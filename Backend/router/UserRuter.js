const express = require('express');
const multer = require('multer');
const path = require('path');
const { register, login, uploadImage, fetchImages, updateImageTitle, updateimage, deleteImage, forgotPassword } = require('../controller/userController');
const userRouter = express.Router();

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Using absolute path
    cb(null, path.resolve(__dirname, '../../Frontend/public/'));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

userRouter.post('/register', register); 
userRouter.post('/login', login);
userRouter.post('/upload', upload.single('image'), uploadImage);
userRouter.get('/fetchimages',fetchImages)
userRouter.put('/updateimagetitle',updateImageTitle)
userRouter.put('/updateimage',upload.single('image'),updateimage)
userRouter.delete('/deleteimage',deleteImage)
userRouter.post('/forgot',forgotPassword)

module.exports = userRouter;
