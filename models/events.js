const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    image: {
        type: String,
    },
    url: {
        type: String,
    },
    featured: {
        type: Boolean,
        default: false
    }
})

mongoose.model('Event', eventSchema)

module.exports = mongoose.model('Event')