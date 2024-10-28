// skeleton code, will need to populate with actual art gallery information
// STILL IN PROGRESS AKA NOT FINISHED
// There may be more exceptions in the future, need to consult
// made with cheerio

const axios = require('axios');
const cheerio = require('cheerio');
const Event = require('../models/eventModel');  // Import the Event model

const url = 'https://example-artgallery.com/events';  // Replace with actual URL

const scrapeEvents = async () => {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    let events = [];

    $('.event').each((i, element) => {
      const eventName = $(element).find('.event-title').text();
      const eventDate = $(element).find('.event-date').text();
      const eventArtist = $(element).find('.event-artist').text();

      events.push({
        name: eventName.trim(),
        date: eventDate.trim(),
        artist: eventArtist.trim(),
        source: url
      });
    });

    // Save events to MongoDB
    await Event.insertMany(events);
    console.log('Events saved to the database.');
  } catch (error) {
    console.error('Error scraping the site:', error);
  }
};

module.exports = { scrapeEvents };
