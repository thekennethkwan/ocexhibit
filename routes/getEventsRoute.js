const express = require('express');
const router = express.Router();

const Event = require('../models/events');

router.get('/events', async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (err) {
        res.status(500).json({ message: "Error fetching events: ", err});
    }
});

module.exports = router;