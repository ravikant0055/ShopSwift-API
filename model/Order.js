const mongoose = require('mongoose')
const {Schema} = mongoose

const orderSchema = new Schema({
    items:[{product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: [true, 'Required id']
    },
    quantity: {
        type: Number,
        required: [true, 'Required id']
    }
    }
]
})

exports.Order = mongoose.model('Order', orderSchema)