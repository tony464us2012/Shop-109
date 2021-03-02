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
    }
    // isPaid: {
    //     type: Boolean,
    //     required: true,
    //     default: false
    // },
}, {
    timestaps: true
})

const Order = mongoose.model('Order', orderSchema)

export default Order