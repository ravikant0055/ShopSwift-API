//the starting page of backend
 const express = require('express');  // web server creating

 const server  = express(); //instance of server

//inmport your routes here
 const productRouter = require("./routes/product");


 //db connection function

 main().catch((err)=> console.log(err));
 async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/myapp'); //herere give your connenctions string along with database name 
    console.log("connected successfully")
 }


 //middleware

 server.use("/product", productRouter.routes);
 server.use(express.json);


 server.listen(process.env.PORT, ()=>{
    console.log("server is runnong ... ")
 });