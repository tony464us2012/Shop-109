import mongoose from 'mongoose'

const promoSchema = mongoose.Schema({
    promo: String,
    discount: Number
})


const SetupSchema = mongoose.Schema({
    cart: {
        type: Boolean, 
        required: true
    },
    minutes: {
        type: String,
        required: true
    },
    promoCodes: [promoSchema]
})

const Setup = mongoose.model('Setup', SetupSchema)

export default Setup