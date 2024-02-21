const mongoose = require('mongoose')
const {Schema} = mongoose

const cartSchema = new Schema({
    items: {
        userId: {
            type: Number,
            required: [true, 'Enter UserId.']
        },
        products: [{
            type: Schema.Types.ObjectId,
            ref: 'Product'
        }]
    }
})

exports.Cart = mongoose.model('Cart', cartSchema)