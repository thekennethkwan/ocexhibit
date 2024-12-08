import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Header from './components/Header';
import './App.css';

import Homepage from './pages/Homepage';
import Events from './pages/Events';
import Login from './pages/Login';
import Register from './pages/Register';
import SubmitTicket from './pages/SubmitTicket';

function App() {
  const [user, setUser] = React.useState(null);

  return (
    <Router>
      <div className="app-container">
        <Header user={ user } setUser={ setUser } />  
        <div className="content">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/events" element={<Events />} />
            <Route path="/login" element={<Login setUser={ setUser }/>} />
            <Route path="/submit-ticket" element={<SubmitTicket />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
