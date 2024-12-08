const mongoose = require('mongoose')

const ticketSchema = new mongoose.Schema({
    ticketType: {
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        required: true
    },
    ticketMessage: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

mongoose.model('Ticket', ticketSchema)

module.exports = mongoose.model('Ticket')