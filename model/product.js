const mongoose = require('mongoose');


const {Schema} = mongoose;


const productSchema = new Schema({
  product_name: { type: String, required: true },
  product_gender: { type: String, required: true },
  product_price: { type: Number, required: true },
  product_images: { type: String, required: true },
  product_color: { type: String, required: true },
  product_details: [
    {
      details: {
        type: String,
        default: [],
      },
    },
  ],
  product_quantity: { type: Number, required: true },
  product_sizes: [{ type: String, required: true }],
},{timestamps: true})

exports.Product = mongoose.model('Product', productSchema)