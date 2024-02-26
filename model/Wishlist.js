const mongoose = require('mongoose')
const {Schema} = mongoose

const wishlistSchema = new Schema({
    // items: {
        userId: {
            type: String,
            required: [true, "Enter UserId."]
        }, 
        products: [{
            type: Schema.Types.ObjectId,
            ref: 'Product'
        }]
    },
    {timestamps: true}
// }
)

exports.Wishlist = mongoose.model('Wishlist', wishlistSchema)