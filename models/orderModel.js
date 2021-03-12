import mongoose from 'mongoose'

const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    orderItems: [
        {
            name: { type: String, required: true },
            price: { type: Number, required: true },
            extraPatty: {type: String},
            pattySwap: {type: String},
            sideSwap: {type: String},
            upgradeSide: {type: String},
            extras: {type: Array},
            large: {type: Boolean},
            sauce: {type: String},
            burger: {type: String},
            fryAddOn: {type: String},
            instructions: {type: String}
        }
    ],
    subtotal: {
        type: Number,
        required: true,
        default: 0.0
    },
    tax: {
        type: Number,
        required: true,
        default: 0.0
    },
    totalprice: {
        type: Number,
        required: true,
        default: 0.0
    },
    date: {
        type: Date,
        default: Date.now()
    }
}, {
    timestaps: true
})

const Order = mongoose.model('Order', orderSchema)

export default Order