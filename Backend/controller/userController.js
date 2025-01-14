const User = require("../model/UserModel");
const Image=require('../model/imageModel')
const bcrypt = require("bcrypt");
const { generateTokens } = require("../utils/token");

const cloudinary = require('../utils/cloudinaryConfig');
const path = require('path');


const securePassword = async (password) => {
    try {
      const hashBcrypt = await bcrypt.hash(password, 10);
      if (hashBcrypt) {
        return hashBcrypt;
      }
    } catch (error) {
      console.log(error.message);
    }
  };

 const register=async(req,res)=>{
    try {
        const {name,email,password,phoneNumber}=req.body
        console.log(name,email,password,phoneNumber);
        const hashPassword=await securePassword(password)
        const createUser=await User.create({
            name:name,
            email:email,
            password:hashPassword,
            mobile:phoneNumber
        })

        res.status(200).json({ message: "created" });
        
    } catch (error) {
        console.log(error);
        
        res.status(500).json("server error")
    }
}


const login=async(req,res)=>{
    try {
        const {email,password}=req.body

    const findUser = await User.findOne({ email: email });

    if (findUser) {
      const passMatching = await bcrypt.compare(password, findUser.password);
      if (passMatching) {
        const { accessToken, refreshToken } = await generateTokens({ id: findUser._id });

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: true, 
            maxAge: 15 * 60 * 1000, 
          });
        
          res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            maxAge: 7 * 24 * 60 * 60 * 1000, 
          });
        let data = {};
        for (let key in findUser.toObject()) {
          if (key !== "password") {
            data[key] = findUser[key];
          }
        }
        res.json({
          data: data,
        });

      } else {
        res.json({ status: "incorrect" });
      }
    } else {
      res.json({ status: "usernotfound" });
    }
    } catch (error) {
        console.log(error);
        res.status(500).json("server error")
    }
}

const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const { title, id } = req.body;
    const imagePath = await  uploadImagefile(req.file.path) // Adjust the path as needed for your frontend

    console.log(title, id, imagePath);  // Debugging info

    const newImage = new Image({
      title,
      imagePath,
      userId: id,
    });

    await newImage.save();
    res.status(201).json({ message: 'Image uploaded successfully', image: newImage });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ message: 'Error uploading image' });
  }
};


const fetchImages=async(req,res)=>{
  try {
    const id=req.query.id
    console.log(id,'this is id');
    
    const fetch=await Image.find({userId:id})

    console.log(id,fetch);
    

    res.status(200).json({fetch:fetch})
  } catch (error) {
    console.error('Error ', error);
    res.status(500).json({ message: 'Error u' });
  }
}


const updateImageTitle=async(req,res)=>{
  try {
    const {id,title}=req.body
    console.log(id,title);
    
    const update=await Image.findByIdAndUpdate({_id:id},{
      $set:{title:title}
    })
    console.log('updating success');
    
    res.status(201).json({message:'update success'})
  } catch (error) {
    console.error('Error ', error);
    res.status(500).json({ message: 'Error u' });
  }
}


const updateimage=async(req,res)=>{
  try {
    const id=req.body.id
    console.log(id);
    console.log('hai there');
    
    
    const imagePath = await uploadImagefile(req.file.path)
    const updateImage=await Image.findByIdAndUpdate({_id:id},{
      $set:{imagePath:imagePath}
    })

    res.status(201).json({message:'update success',imagePath:imagePath})
  } catch (error) {
    console.error('Error ', error);
    res.status(500).json({ message: 'Error u' });
  }
}



const deleteImage=async(req,res)=>{
  try {
    const id=req.query.id
    console.log(id,'detlete id');
    
   const deleteTheImage=await Image.findByIdAndDelete({_id:id})
    res.status(201).json({message:'delete  success'})
  } catch (error) {
    console.error('Error ', error);
    res.status(500).json({ message: 'Error u' });
  }
}


const forgotPassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find the user by email
    const findUser = await User.findOne({ email: email });
    
    // Check if user exists
    if (!findUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    const hashPassword=await securePassword(password)
    // Update the password
    findUser.password = hashPassword; // Ensure this password is hashed before saving
    await findUser.save();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};



// Upload an image to Cloudinary
const uploadImagefile = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'stockimage', // Optional folder in Cloudinary
    });
    console.log('Image uploaded successfully:', result.secure_url);
    return result.secure_url; // This URL can be stored in your database
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};





module.exports={
    register,
    login,
    uploadImage,
    fetchImages,
    updateImageTitle,
    updateimage,
    deleteImage,
    forgotPassword
}