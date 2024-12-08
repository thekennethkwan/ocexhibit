const mongoose = require('mongoose')

const exhibitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    image: {
        data: Buffer,
    },
    url: {
        type: String,
    },
    address: {
        type: String,
    },
})

mongoose.model('Exhibit', exhibitSchema)

module.exports = mongoose.model('Exhibit')