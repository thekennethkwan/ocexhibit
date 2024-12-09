const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    image: {
        type: String,
    },
    url: {
        type: String,
    },
    address: {
        type: String,
    }
})

mongoose.model('Event', eventSchema)

module.exports = mongoose.model('Event')