const express = require('express');
const router = express.Router();
const { S3Client, GetObjectCommand, S3 } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

const Event = require('../models/events');

require('dotenv').config();

const s3 = new S3Client({
    region: process.env.BUCKET_REGION,
    credentials: {
        accessKeyId: process.env.ACCESS_KEY,
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
    },
});

router.get('/events', async (req, res) => {
    try {
        const events = await Event.find();
        //console.log('Event date: ', events[0].startDate);
        for (let event of events) {
            const command = new GetObjectCommand({
                Bucket: process.env.BUCKET_NAME,
                Key: event.image,
            });
            const url = await getSignedUrl(s3, command);
            event.image = url;
        }
        res.json(events);
    } catch (err) {
        res.status(500).json({ message: "Error fetching events: ", err});
    }
});

module.exports = router;