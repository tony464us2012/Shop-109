import mongoose from 'mongoose'


const BottleSchema = mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    type: {
        type: String,
        required: true
    },
    price: {
        type: String, 
        required: true
    }
})

const Bottle = mongoose.model('Bottle', BottleSchema)

export default Bottle