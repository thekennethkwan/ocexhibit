import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

function Login({ setUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/login', {
          method: 'POST',
          headers: {
          'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              username: username,
              password: password,
          }),
      });

        const data = await response.json();

        if (data.message === 'Login successful') {
            setUser(data.user)
            console.log('Logged in user: ', data.user);
            alert('Login successful');
            navigate('/');
        } else {
            alert('Error logging in - ' + data.message);
        }
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <div className="login-container">
      <h2>Login to Exhibit OC</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">Login</button>
      </form>
      <p>Don't have an account? <Link to="/Register">Register</Link></p>
    </div>
  );
}

export default Login;
