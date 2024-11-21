const express = require("express");
const cors = require("cors");
const app = express();

const connectDB = require("./database/database"); 
const userRuter=require('./router/UserRuter')
require('dotenv').config()
app.use(express.json());
app.use(cors({
  origin:["http://localhost:5173","https://stock-image-platform-nine.vercel.app/"],
  credentials:true
}));
connectDB()


app.use('/',userRuter)

app.listen(3000, () => {
  console.log("server running http://localhost:5555/");
});
