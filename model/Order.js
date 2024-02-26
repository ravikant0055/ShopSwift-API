const mongoose = require('mongoose')
const {Schema} = mongoose

const orderSchema = new Schema({
    userId: {
        type: String,
        required: [true, "Enter UserId."]
    },
    items: [
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ],
    totalPrice: {
        type: Number,
        required: true
    },
    orderDate: {
        type: Date,
        default: Date.now
    }
})

exports.Order = mongoose.model('Order', orderSchema)