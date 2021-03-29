const mongoose = require('mongoose');


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

module.exports = mongoose.model('Bottle', BottleSchema)