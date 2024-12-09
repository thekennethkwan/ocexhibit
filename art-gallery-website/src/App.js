import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import Header from './components/Header';
import Homepage from './pages/Homepage';
import Events from './pages/Events';
import Login from './pages/Login';
import Register from './pages/Register';
import SubmitTicket from './pages/SubmitTicket';
import AddEvent from './pages/AddEvent';

function App() {
  const [user, setUser] = React.useState(null);

  return (
    <Router>
      <div className="app-container">
        <Header user={ user } setUser={ setUser } />  
        <div className="content">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/events" element={<Events user= { user } />} />
            <Route path="/login" element={<Login setUser={ setUser } />} />
            <Route path="/submit-ticket" element={<SubmitTicket user= { user } />} />
            <Route path="/register" element={<Register />} />
            <Route path="/add-event" element={<AddEvent />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
