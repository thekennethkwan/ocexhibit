// skeleton code, will need to populate with actual art gallery information
// STILL IN PROGRESS AKA NOT FINISHED
// There may be more exceptions in the future, need to consult
// made with cheerio
const axios = require('axios');
const cheerio = require('cheerio');
const fetch = require('node-fetch');
const EasyOCR = require('easyocr');
const readline = require('readline');
const Event = require('../models/eventModel');
const galleryConfig = require('../config/galleryConfig.json');

// OCR function
const runOCR = async (imageData) => {
  const reader = new EasyOCR.Reader(['en']);
  const result = await reader.readtext(imageData);
  return result.map(text => text[1]).join(', ');
};

// Function for editing fields
const editField = (fieldName, currentValue) => {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.question(`Current ${fieldName} is "${currentValue}". Press Enter to keep, or type new value: `, (answer) => {
      rl.close();
      resolve(answer.trim() === '' ? currentValue : answer);
    });
  });
};

const confirmAndEditEvent = async (event) => {
  console.log("\nExtracted Event Data:");
  console.log(JSON.stringify(event, null, 2));

  event.name = await editField("Event Name", event.name);
  event.date = await editField("Event Date", event.date);
  event.artists = await editField("Artists", event.artists.join(', ')).then(res => res.split(',').map(name => name.trim()));

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    rl.question('Do you want to save this event to the database? (yes/no): ', (answer) => {
      rl.close();
      resolve(answer.toLowerCase() === 'yes');
    });
  });
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
          const ocrText = await runOCR(Buffer.from(imageData));
          eventArtists.push(...ocrText.split(',').map(item => item.trim()));
        }

        const event = {
          name: eventName,
          date: eventDate,
          artists: Array.from(new Set(eventArtists)),
          source: url
        };

        if (await confirmAndEditEvent(event)) {
          const existingEvent = await Event.findOne({ name: event.name, date: event.date });
          if (!existingEvent) {
            await Event.create(event);
            console.log('Event saved to the database.');
          } else {
            console.log('Event already exists in the database.');
          }
        } else {
          console.log('Event discarded by user.');
        }
      });
    } catch (error) {
      console.error(`Error scraping ${gallery.name}:`, error);
    }
  }
};

module.exports = { scrapeEvents };
