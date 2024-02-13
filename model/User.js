const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
        email:{
            type: String,
            required: [true, "Please enter email"],
            // can also add max and min length using maxLength and minLength
        },
        password:{
            type: String,
            required: [true, "Please enter your password"]
        }
    
},
{timestamps: true})

