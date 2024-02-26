const model = require('../model/User')

const User = model.User;

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().then((res) => {
            return res.status(200).json({success:true, users });
        }).catch(err => {
            return res.status(400).json({success:false, error: err.message, message:"Unable to find User."})
        })
        
    } catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({ success: false, error: error.message, message: 'Failed to fetch users.' });
    }
};

exports.registerUser = async(req, res) => {
    try{
        const { username, email, password, confirmPassword } = req.body;
        let user;
        if(!username || !email || !password || !confirmPassword){
            return res.status(402).json({success: false, message: "Please enter all details."})
        }
        if(password !== confirmPassword){``
            return res.status(403).json({success: false, message:"Password doesn't match."})
        }
        user = await User.findOne({email});
        if(user){
            return res.status(403).json({success: false, message:"User already exists."})
        }
        
        const hashPass = await bcrypt.hash(password, 10)
        // const newUser = new User({
        //     username,
        //     email,
        //     hashPass
        // })
        // const savedUser = await newUser.save() 
        const savedUser = await User.create({username, email, password: hashPass})
        savedUser.password = null
        const token = jwt.sign({id: savedUser._id , role:savedUser.role}, process.env.JWT_SECRET);
        return res.status(201).json({success: true, user: savedUser,token: token,  message: 'User registered successfully.'})
    }
    catch(err){
        return res.status(500).json({success: false, message: 'Failed to register user.', error: err.message})
    }
}

exports.loginUser = async(req, res) => {
    try{
        const{email, password} = req.body;
        let user;
        let token;
        if(!email || !password){
            return res.status(402).json({success: false, message: 'Please enter all details.'})
        }
        
        user = await User.findOne({email})
        console.log(user)
        if(user){
            const compare = await bcrypt.compare(password, user.password)
            if(compare){
                user.password = null;
                token = jwt.sign({id: user._id, role: user.role}, process.env.JWT_SECRET)
                return res.status(200).json({success: true, user: user, token})
            }
            else{
                return res.status(400).json({success: false, message: "Wrong Password." })
            }
        }
        return res.status(403).json('No user exists foir given email.')
    }
    catch(err){
        return res.status(500).json({status: false, message: 'Failed to Login User.', error: err.message})
    }
}

exports.updateUser = async (req, res) => {
    try{
        const {userId, userDetails} = req.body;
        const user = await User.findById(userId);
        if(user){
            await User.findByIdAndUpdate(userId, {...userDetails}, {new: true}).then(resp => {
                return res.status(200).json({
                    success: true,
                    updatedUser: resp,
                    message: "User Updated successfully."
                })
            })
        }
        return res.status(400).json({
            success: false,
            messaga: "No user exists for given Id"
        })
    }
    catch(err){

    }
}