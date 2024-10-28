import React, { useState } from 'react';
import './AddEvent.css';

function AddEvent({ onAddEvent }) {
  const [date, setDate] = useState('');
  const [title, setTitle] = useState('');
  const [isAdmin] = useState(true); // Simulated admin check; set to true for admin access

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddEvent({ date, title });
    setDate('');
    setTitle('');
  };

  if (!isAdmin) return null; // Hide form if not admin

  return (
    <form className="add-event-form" onSubmit={handleSubmit}>
      <h2>Add Event</h2>
      <label>
        Date:
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </label>
      <label>
        Title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>
      <button type="submit">Add Event</button>
    </form>
  );
}

export default AddEvent;
