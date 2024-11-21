const express = require("express");
const cors = require("cors");
const app = express();

const connectDB = require("./database/database"); 
const userRuter=require('./router/UserRuter')
require('dotenv').config()
app.use(express.json());
app.use(cors({
  origin: ["https://stock-image-platform-nine.vercel.app","http://localhost:5173",], 
  credentials: true, 
  methods: ["GET", "POST", "PUT", "DELETE"], 
  allowedHeaders: ["Content-Type", "Authorization"], 
}));
connectDB()


app.use('/',userRuter)

app.listen(3000, () => {
  console.log("server running http://localhost:5555/");
});
