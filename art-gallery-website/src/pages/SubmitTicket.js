import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import './SubmitTicket.css';

function SubmitTicket() {
  const [ticketType, setTicketType] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleTicketSubmission = (e) => {
    e.preventDefault();
    
    // Using EmailJS to send email
    // might not end up using Email JS
    // but short term we are able to test that the ticket system works

    emailjs.send(
      'service_15we7ox', // service ID
      'template_3vhodzo', // template ID
      {
        ticket_type: ticketType,
        user_email: userEmail,
        message: message,
      }, 
      'tnuy3TSj81PyipWAW' // public key - found under account
    )
    .then((result) => {
      console.log(result.text);
      alert('Ticket submitted successfully!');
    }, (error) => {
      console.log(error.text);
      alert('Failed to submit ticket, please try again.');
    });
    
    // Clear form fields
    setTicketType('');
    setUserEmail('');
    setMessage('');
  };

  return (
    <div className="ticket-container">
      <h2>Submit a Ticket</h2>
      <form onSubmit={handleTicketSubmission}>
        <div className="form-group">
          <label htmlFor="ticketType">Ticket Type</label>
          <select
            id="ticketType"
            value={ticketType}
            onChange={(e) => setTicketType(e.target.value)}
            required
          >
            <option value="">Select an option</option>
            <option value="Add Gallery">Add Gallery</option>
            <option value="Delete Gallery">Delete Gallery</option>
            <option value="Report Bug">Report Bug</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Your Email</label>
          <input
            type="email"
            id="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            rows="4"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
        </div>

        <button type="submit" className="submit-button">Submit Ticket</button>
      </form>
    </div>
  );
}

export default SubmitTicket;
