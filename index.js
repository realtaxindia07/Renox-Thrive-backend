const express=require("express")
const cors=require("cors");
const {readData,writeData}=require("./config/googleSheet")

require("dotenv").config()


const app=express();

app.use(cors({
  origin: process.env.front_url,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use(express.json())

app.post("/",(req,res)=>{
    try{
    writeData({...req.body},process.env.SHEET_ID)
    // readData(process.env.SHEET_ID)
    // console.log(process.env.SHEET_ID)
    res.json({status:200,message:"success"})
}catch(err){
    res.json({status:400,message:"faled"})
    console.log(err)
}
})
app.listen(5000,()=>{
    console.log("server listening..")
})
