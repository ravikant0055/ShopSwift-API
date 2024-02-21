
const { User } = require('../model/User');
const model = require('../model/Wishlist')
const Wishlist = model.Wishlist

exports.getWishlist = async(req, res) => {
    try{
        const {userId} = req.body;
        console.log(userId)
        const items = await Wishlist.findOne({userId})
        if(items){
            return res.status(200).json({success: true, items})
        }
        return res.status(400).json({success: false, message: "No products in wishlist."})
    }
    catch(err){
        return res.status(500).json({success: false, message: 'Failed to fetch',error: err.message })
    }
}

exports.addWishlist = async(req, res) => {
    try{
        const {userId, productId}= req.body;
        const existingWishlist = await Wishlist.findOne({userId:userId})
        if(existingWishlist){
            console.log(existingWishlist.products);
            Wishlist.fi
            await Wishlist.findOneAndUpdate({userId: userId}, {$push : {products: productId}}, {new: true}).then((resp) => {
                return res.status(200).json({success: true, resp, message: "Added to existing Wishlist."})
            })
            
        }else{
            console.log(userId)
            const user = await User.findOne({userId})
            if(!user){
                const newWishlist = await Wishlist.create({userId:userId, products:[productId]})
                return res.status(200).json({success: true, newWishlist, message: 'Added to Wishlist.'})
            }
            return res.status(403).json({success: false, message: 'No user exists.'})
        }
    }
    catch(err){
        return res.status(500).json({success: false, message: 'Failed to add Wishlist.', error: err.message})
    }
}