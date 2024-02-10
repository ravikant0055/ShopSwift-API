//creating web server
const express = require('express'); 

//creating instance of Router from express library
const productRouter = express.Router();

//import your controller here
const productController = require('../controller/product')


//define your routes here 

productRouter
.get('/',productController.getAllProducts);

//like this you can create your all routes here (post, get, delete , update)

//export your route named as "routes"
exports.routes = productRouter;