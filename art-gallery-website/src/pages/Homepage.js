import React, { useEffect, useState } from 'react';
import './Homepage.css';

function Homepage() {
  /*// Here we have some events that were manually added
  // Must automate this process
  const events = [
    {
      title: 'Uncanvased',
      date: 'Oct 5 - 26, 2024',
      image: '/images/event1.jpg',
      url: 'https://www.occca.org/current-exhibition',
    },
    {
      title: 'Original Sources',
      date: 'Nov 2 - 30, 2024',
      image: '/images/event2.jpg',
      url: 'https://www.occca.org/current-exhibition',
    },
    /*{
      title: 'Observations',
      date: 'Oct 2 - Dec 7, 2024',
      image: '/images/event3.jpg',
      url: 'https://www.huntingtonbeachartcenter.org/veteransphotoshow.html',
    },
  ];*/

  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/events');
        const events = await response.json();

        const today = new Date();

        const featuredEvents = events.filter(event => event.featured && new Date(event.startDate) <= today && new Date(event.endDate) >= today);

        setEvents(featuredEvents);
      } catch (error) {
        console.error('Error fetching events: ', error);
      }
    };
    
    fetchEvents();
  }, []);

  return (
    <div className="homepage">
      <header className="header">
        <h1>Welcome to Exhibit OC</h1>
        <p>Discover amazing art galleries and events in Orange County.</p>
      </header>
      
      <section className="featured-events">
        <h2>Featured Events</h2>
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
          )) : <p>No featured events at the moment.</p>}
        </div>
      </section>

      <section className="about">
        <h2>About Us</h2>
        <p>Exhibit OC brings you the best art events and galleries in Orange County. Whether you're an art enthusiast or a casual visitor, explore our curated events and discover something new.</p>
      </section>
    </div>
  );
}

export default Homepage;
