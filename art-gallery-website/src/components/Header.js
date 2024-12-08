import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';


function Header( {user, setUser} ) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  return (
    <div className = "topbar">
      <h2>Exhibit OC</h2>
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/events">Events</Link>
        </li>
        <li>
          {user ? (
            <>
              <span className="username">Welcome, {user.username}</span>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </li>
        <li>
          {user && (
            <Link to="/submit-ticket">Submit Ticket</Link>
          )}
        </li>
      </ul>
    </div>);
}

export default Header;
