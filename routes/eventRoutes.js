const express = require('express');
const router = express.Router();
const { scrapeEvents } = require('../services/scraperService');  // Import the scraper service
const { performOCR } = require('../services/ocrService');  // Import OCR service

// Route to trigger scraping
router.get('/scrape', async (req, res) => {
  try {
    await scrapeEvents();  // Trigger the scraper
    res.send('Scraping completed.');
  } catch (error) {
    console.error('Error in scraping:', error);
    res.status(500).send('Error scraping events');
  }
});

// Route to trigger OCR on an image
router.get('/ocr', async (req, res) => {
  try {
    const extractedText = await performOCR();  // Run OCR
    res.json({ extractedText });  // Return extracted text as JSON
  } catch (error) {
    res.status(500).send('Error performing OCR');
  }
});

module.exports = router;
