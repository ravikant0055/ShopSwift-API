const model = require("../model/product");   //PATH_OF_MODEL


//
const Product = model.Product;

//creating controller for feting all product details
exports.getAllProducts = async(req,res)=>{
    const products = await Product.find(); // this will fetch all product form the db
}

//like this creat your controller fucntion here