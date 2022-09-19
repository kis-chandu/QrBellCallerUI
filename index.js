const express = require("express");
const path = require("path");
const app = express();
app.use(express.static(path.join(__dirname,"/assets")));

app.get("/",(req,res)=>{
   // res.send("Working");
    res.sendFile(path.join(__dirname,"views/index.html"));
})

app.listen("9000",(req,res)=>{
    console.log("Server started");
})