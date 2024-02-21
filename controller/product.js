const model = require("../model/product");

const Product = model.Product;

exports.getAllProducts = async (req, res) => {
  try {
    const product = await Product.find();
    res.json(product);
  } catch (err) {
    console.log("Error => ", err);
  }
};

exports.addProducts = async (req, res) => {
  

  try {
    const existingProduct = await Product.findOne({ product_id: req.body.product_id });
  if (existingProduct) {
    
    return res.status(400).json('Product with the same product_id already exists' );
  }
    const addProduct = new Product(req.body);
    await addProduct.save().then(() => {
      res.json(req.body);
    });
  } catch (err) {
    console.log("Error => ", err);
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { product_id: req.params.product_id },
      req.body,
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(400).json("Bad Request");
  }
};
exports.deleteProduct = async (req, res) => {
  try {
    const deleteProducted = await Product.findOneAndDelete(
      { product_id: req.params.product_id },
      { new: true }
    );
    res.status(200).json("DELETED SUCCESSFULLY...");
  } catch (err) {
    res.status(400).json("Bad Request..");
  }
};
