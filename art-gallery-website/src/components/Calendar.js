import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Calendar.css'; // Custom styles if needed
// import AddEvent from './AddEvent'; // for admin only might remove this

function EventsCalendar() {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);

  // Fetch events from backend (dummy fetch here)
  useEffect(() => {
    // Simulate a fetch call
    const fetchEvents = async () => {
      // Replace this with actual fetch from backend
      // For now these events have been added manually
      const fetchedEvents = [
        { date: '2024-02-14', title: 'Art Expo 2024' },
        { date: '2024-03-12', title: 'Modern Art Showcase' },
        { date: '2024-04-08', title: 'Gallery Night' },
      ];
      setEvents(fetchedEvents);
    };
    fetchEvents();
  }, []);

  // Filter events for the selected date
  const eventsForDate = events.filter(
    (event) => event.date === date.toISOString().split('T')[0]
  );

  return (
    <div className="calendar-container">
      <Calendar onChange={setDate} value={date} />
      <div className="events-list">
        <h3>Events on {date.toDateString()}</h3>
        {eventsForDate.length ? (
          eventsForDate.map((event, index) => (
            <div key={index} className="event-item">
              {event.title}
            </div>
          ))
        ) : (
          <p>No events for this day.</p>
        )}
      </div>
    </div>
  );
}

export default EventsCalendar;
