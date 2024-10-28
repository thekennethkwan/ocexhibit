import React from 'react';
import Calendar from '../components/Calendar';
import Map from '../components/Map';

function Events() {
  return (
    <div>
      <h1>Upcoming Art Events</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <Calendar />
        <Map />
      </div>
    </div>
  );
}

export default Events;

