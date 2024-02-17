const model = require('../model/product');

const Product = model.Product;



exports.getAllProducts = async(req,res)=>{
    try{
        const product = await Product.find();
        res.json(product);
        }catch(err){
            console.log("Error => ", err);
        }
    }

    exports.addProducts = async(req,res)=>{
        try{
            const addProduct = new Product(req.body)
            await addProduct.save().then(()=>{
                res.json(req.body);
            })
        }catch(err){
            console.log("Error => ",err)
        }
    }


    exports.updateProduct = async(req,res)=>{
        try{
            const updatedProduct = await Product.findOneAndUpdate({product_id: req.params.product_id}, req.body , {new:true});
            res.status(200).json(updatedProduct);

        }catch(err){
            console.log("Error => ", err);
        }
    }