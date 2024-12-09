import React from 'react';
import Calendar from '../components/Calendar';
import Map from '../components/Map';
import { Link } from 'react-router-dom';

//import './Events.css';

function Events( {user} ) {
  return (
    <div>
      {user && user.isAdmin && (
              <Link to="/add-event">
                <button style={{ marginTop: '20px' }}>Add Event</button>
              </Link>
            )}

      <h1>Upcoming Art Events</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <Calendar />
        <Map />
      </div>
    </div>
  );
}

export default Events;
