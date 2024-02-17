require('dotenv').config();
// creating web server
const express = require('express')
const server = express();  // creating instance of web server
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const productRouter = require("./routes/product")
const cors = require('cors');


server.use(express.json());
server.use(cors());
server.use(bodyParser.json());
server.use(
    bodyParser.urlencoded({
      extended: true,
    }),
  );
server.use('/product',productRouter.routes);

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.DB_CONNECTION_STRING);
    console.log("Database connected")
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}


server.listen(5000, ()=>{
    console.log("Server is Running...")
})