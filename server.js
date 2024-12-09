const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const registerRoute = require('./routes/registerRoute')
const loginRoute = require('./routes/loginRoute')
const ticketRoute = require('./routes/ticketRoute')
const addEventRoute = require('./routes/addEventRoute')
const getEventsRoute = require('./routes/getEventsRoute')

require('dotenv').config();

const app = express();

app.use(cors({
  origin: 'http://localhost:3000'  // Allow React frontend to access the API
}));

app.use(express.json());  // For parsing JSON bodies

// MongoDB connection
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Import and use event routes (includes the route for triggering the scraper)
//const eventRoutes = require('./routes/eventRoutes');
//app.use('/api', eventRoutes);  // All event-related routes will have the '/api' prefix

app.use('/api', registerRoute)
app.use('/api', loginRoute)
app.use('/api', ticketRoute)
app.use('/api', addEventRoute)
app.use('/api', getEventsRoute)

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});