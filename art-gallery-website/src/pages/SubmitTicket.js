import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import './SubmitTicket.css';

function SubmitTicket( { user } ) {
  const [ticketType, setTicketType] = useState('');
  const [message, setMessage] = useState('');

  const handleTicketSubmission = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/submit-ticket', {
          method: 'POST',
          headers: {
          'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              ticketType: ticketType,
              userEmail: user.email,
              ticketMessage: message,
          }),
      });

      const data = await response.json();

      if (data.message === 'Ticket submitted successfully') {
          alert('Ticket submitted successfully');

          emailjs.send(
            'service_byrt8tb', // service ID
            'template_ecqhq68', // template ID
            {
              ticket_type: ticketType,
              user_email: user.email,
              message: message,
            }, 
            '13eOk1qc-a_WhZo0h' // public key - found under account
          )
      };
      setTicketType('');
      setMessage('');
      } catch (error) {
          alert('Error submitting ticket - ' + error);
      }

      setTicketType('');
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
            <option value="Add Gallery">Add Gallery (Please provide a link)</option>
            <option value="Delete Gallery">Delete Gallery</option>
            <option value="Report Bug">Report Bug</option>
          </select>
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
