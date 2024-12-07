import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Events from './pages/Events';
import Login from './pages/Login';
import Register from './pages/Register';
import SubmitTicket from './pages/SubmitTicket';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav className="topbar">
          <h2>Exhibit OC</h2>
          <ul className="nav-links">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/events">Events</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/submit-ticket">Submit Ticket</Link>
            </li>
          </ul>
        </nav>
        <div className="content">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/events" element={<Events />} />
            <Route path="/login" element={<Login />} />
            <Route path="/submit-ticket" element={<SubmitTicket />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
