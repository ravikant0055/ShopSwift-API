const mongoose = require("mongoose");
const {Schema} = mongoose
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Enter your name']
    },
    email:{
        type: String,
        required: [true, "Please enter email"],

        // can also add max and min length using maxLength and minLength
    },
    password:{
        type: String,
        required: [true, "Please enter your password"],

    },
    contactNumber: String,
    address: [{
        type: String,

    }],
    role: {
        type: String,
        default: 'User'
    },
    orders : [{
        type : Schema.Types.ObjectId,
        ref: "Orders"
    }],
    wishlist : [{
        type: Schema.Types.ObjectId,
        ref: "Wishlist"
    }],
    cart : [{
        type: Schema.Types.ObjectId,
        ref : "Cart"
    }]

    
},
{timestamps: true})

exports.User = mongoose.model('User', userSchema);