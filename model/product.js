//importing the mongoose library to get connected with database
const mongoose = require('mongoose');

const {Schema} = mongoose;




//Define your schema here
const productSchema  = new Schema({
    title: {type:String,require:true}  //like this
})

//exporting the model named as "Product"
exports.Product = mongoose.model('Product', productSchema);