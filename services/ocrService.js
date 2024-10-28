// Will test out more in the future with images
// Built using tesseract

const Tesseract = require('tesseract.js');
const fs = require('fs');
const path = require('path');

// Example path to the image to be processed
const imagePath = path.join(__dirname, '../images/event-poster.jpg');  // Make sure the image exists here

const performOCR = async () => {
  try {
    // Run OCR on the image
    const { data: { text } } = await Tesseract.recognize(
      imagePath,
      'eng',  // Language setting, you can change this if needed
      {
        logger: m => console.log(m),  // Optional logger to track OCR progress
      }
    );
    
    console.log('Extracted text from image:', text);
    
    // You can further process this text to extract specific data (like event name, date, etc.)
    return text;

  } catch (error) {
    console.error('Error during OCR process:', error);
    throw error;
  }
};

module.exports = { performOCR };
