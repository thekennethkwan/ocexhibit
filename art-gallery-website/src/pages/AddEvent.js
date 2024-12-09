import React , { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './AddEvent.css';

function AddEvent() {
    const [title, setTitle] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState('');

    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('name', title);
        formData.append('startDate', startDate);
        formData.append('endDate', endDate);
        formData.append('image', image);
        formData.append('url', url);

        try {
            const response = await fetch('http://localhost:5000/api/add-event', {
                method: 'POST',
                body: formData,
            });
    
            console.log('Response received:', response);
    
            const data = await response.json();
    
            console.log('Data from response:', data);

            if (data.message === 'Event registered successfully') {
                alert('Event registered successfully');
                navigate("/events");
            }
            } catch (error) {
                console.error('Error', error);
            }

        setStartDate('');
        setEndDate('');
        setTitle('');
        setImage(null);
        setUrl('');
    };
  
    return (
      <form className="add-event-form" onSubmit={handleSubmit}>
        <h2>Add Event</h2>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label>
          Start Date:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </label>
        <label>
          End Date:
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </label>
        <label>
            Upload Image:
            <input 
            type="file"
            name="image"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            required
            />
        </label>
        <label>
            URL: 
            <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            />
        </label>
        <button type="submit">Add Event</button>
      </form>
    );
  }

export default AddEvent;
