const express = require('express');
const router = express.Router();
const multer = require('multer');
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const crypto = require('crypto');

const Event = require('../models/events');

require('dotenv').config();

const randomImageName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
upload.single('image');

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey
  },
  region: bucketRegion
});

router.post('/add-event', upload.single('image'), async (req, res) => {

  console.log('Request received:', req.body);
  console.log('File received:', req.file);

  const imageName = randomImageName();

  const params = {
    Bucket: bucketName,
    Key: imageName,
    Body: req.file.buffer,
    ContentType: req.file.mimetype,
  }

  const command = new PutObjectCommand(params)

  await s3.send(command)

  const newEvent = new Event({
    name: req.body.name,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    image: imageName,
    url: req.body.url,
  });

  newEvent.save()
        .then(event => {
            res.status(200).json({ message: 'Event registered successfully' });
        })
        .catch(err => {
            res.status(500).json({ message: 'Error during event registration', error: err.message });
        });
});

module.exports = router;
