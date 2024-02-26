//the starting page of backend
 const express = require('express');  // web server creating
 const server  = express(); //instance of server

//inmport your routes here
 const productRouter = require("./routes/product");
 const userRouter = require("./routes/userRoutes")
 const wishlistRouter = require('./routes/wishlistRoutes')
 const orderRouter = require('./routes/orderRoutes')
 const mongoose = require('mongoose')
 require('dotenv').config();


 //server required things
 server.use(express.json());



 //db connection function

 main().catch((err)=> console.log(err));
 async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/myApp'); //herere give your connenctions string along with database name 
    console.log("connected successfully")
 }


 //middleware

 server.use("/", productRouter.routes);
 server.use('/', userRouter.routes)
 server.use('/', wishlistRouter.routes)
 server.use('/', productRouter.routes)
 server.use('/', orderRouter.routes)
 server.use(express.json);


 server.listen(process.env.PORT, ()=>{
    console.log("server is running ... ")
 });