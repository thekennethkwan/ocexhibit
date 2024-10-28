// Will test out more in the future with images
// Built using tesseract
// DEFUNCT WILL NOW BE USING EASYOCR
/*
const axios = require('axios');
const cheerio = require('cheerio');
const fetch = require('node-fetch');
const { spawn } = require('child_process');
const Event = require('../models/eventModel');
const galleryConfig = require('./galleryConfig.json');

const runOCR = async (imageData) => {
  const reader = new EasyOCR.Reader(['en']);  // Set language
  const result = await reader.readtext(imageData);
  return result.map(text => text[1]).join(', ');  // Extract text content
};

const scrapeEvents = async () => {
  for (const gallery of galleryConfig) {
    const { url, selectors } = gallery;
    try {
      const { data } = await axios.get(url);
      const $ = cheerio.load(data);
      let events = [];

      $(selectors.eventContainer).each(async (i, element) => {
        const eventName = $(element).find(selectors.eventName).text().trim();
        const eventDate = $(element).find(selectors.eventDate).text().trim();
        const imageUrl = $(element).find(selectors.eventImage).attr('src');

        let eventArtists = [];
        $(element).find(selectors.eventArtists).each((j, artistElem) => {
          const artistName = $(artistElem).text().trim();
          if (artistName) eventArtists.push(artistName);
        });

        if (imageUrl) {
          const imageData = await fetch(imageUrl).then(res => res.arrayBuffer());
          const ocrText = await runOCR(Buffer.from(imageData));  // Run OCR
          eventArtists.push(...ocrText.split(',').map(item => item.trim()));
        }

        events.push({
          name: eventName,
          date: eventDate,
          artists: Array.from(new Set(eventArtists)),
          source: url
        });
      });

      for (const event of events) {
        const existingEvent = await Event.findOne({ name: event.name, date: event.date });
        if (!existingEvent) {
          await Event.create(event);
        }
      }

      console.log(`Events from ${gallery.name} saved to the database.`);
    } catch (error) {
      console.error(`Error scraping ${gallery.name}:`, error);
    }
  }
};

module.exports = { scrapeEvents };
*/