const express = require('express');
const router = express.Router();

const Ticket = require('../models/tickets');

router.post('/submit-ticket', async (req, res) => {
    const { ticketType, userEmail, ticketMessage } = req.body;

    const newTicket = new Ticket({
        ticketType,
        userEmail,
        ticketMessage
    });

    newTicket.save()
        .then(ticket => {
            res.json({ message: 'Ticket submitted successfully' });
        })
        .catch(err => {
            res.status(500).json({ message: 'Error submitting ticket', error: err.message });
        });
});

module.exports = router;