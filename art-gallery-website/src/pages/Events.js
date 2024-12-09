import React, { useEffect, useState } from 'react';
import Calendar from '../components/Calendar';
//import Map from '../components/Map';
import { Link } from 'react-router-dom';

import './Events.css';

function Events( {user} ) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/events');
        const events = await response.json();

        const today = new Date();

        const upcomingEvents = events.filter(event => new Date(event.endDate) >= today);
        
        setEvents(upcomingEvents);
      } catch (error) {
        console.error('Error fetching events: ', error);
      }
    };
    
    fetchEvents();
  }, []);

  return (
    <div>
      {user && user.isAdmin && (
        <div className="add-event-container">
              <Link to="/add-event">
                <button className="add-event-button">Add Event</button>
              </Link>
        </div>
      )}

      <h1>Upcoming Art Events</h1>
      <div className="event-grid">
          {events && events.length > 0 ?
            events.map((event, index) => (
            <a
              key={index}
              href={event.url}
              target="_blank"
              rel="noopener noreferrer"
              className="event-card"
            >
              <img src={event.image} alt={event.name} />
              <h3>{event.name}</h3>
              <p>Date: {new Date(event.startDate).toLocaleDateString()} - {new Date(event.endDate).toLocaleDateString()}</p>
            </a>
          )) : <p>Stay tuned for upcoming events.</p>}
        </div>
      <div classname="calendar-map container">
        <Calendar classname="calendar"/>
      </div>
    </div>
  );
}

export default Events;
