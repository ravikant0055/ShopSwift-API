

const mongoose = require('mongoose');


const {Schema} = mongoose;


const addressSchema = new Schema({
    address_id:{type:Number , require:true},
    fname:{type:String , require:true},
    lname:{type:String , require:true},
    email:{type:String , require:true},
    contactno:{type:Number , require:true},
    pincode:{type:Number , require:true},
    hno:{type:String , require:true},
    city:{type:String , require:true},
    town:{type:String , require:true},
    state:{type:String , require:true},
    defaultAddress:Boolean
})

exports.Address = mongoose.model('Address', addressSchema)