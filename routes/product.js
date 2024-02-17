const express =  require('express');
const productRouter = express.Router();

const productController = require('../controller/product')

productRouter
.get("/", productController.getAllProducts)

.post("/addProduct", productController.addProducts)

.patch("/updateProduct/:product_id", productController.updateProduct)

.delete("/deleteProduct/:product_id" ,productController.deleteProduct)

exports.routes = productRouter;


