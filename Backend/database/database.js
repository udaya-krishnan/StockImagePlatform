const mongoose=require('mongoose')
require('dotenv').config()

const connectDB=async()=>{
    try {
        await mongoose.connect("mongodb://localhost:27017/StockImagePlatform").then(()=>{
            console.log('Database connect')
        })
        
    } catch (error) {
        console.log('mongoDB Not connect')
    }
}
module.exports=connectDB