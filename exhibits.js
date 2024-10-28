const mongoose = require('mongoose')

const exhibitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    price: {
        type: Number
    }
    // image: { // Placeholder for image of the exhibit
    //     type: String
    // }
})

mongoose.model('Exhibit', exhibitSchema)

module.exports = mongoose.model('Exhibit')