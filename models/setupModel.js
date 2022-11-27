import mongoose from 'mongoose'


const SetupSchema = mongoose.Schema({
    cart: {
        type: Boolean, 
        required: true
    },
    minutes: {
        type: String,
        required: true
    },
})

const Setup = mongoose.model('Setup', SetupSchema)

export default Setup