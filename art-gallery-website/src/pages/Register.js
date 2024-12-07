import React, { useState } from 'react';
import './Register.css';

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
  
    const handleRegister = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
        console.log('Passwords do not match');
        return;
        }

        try {
        const response = await fetch('http://localhost:5000/api/register', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password,
            }),
        });

        //console.log('Response received:', response);

        const data = await response.json();

        //console.log('Data from response:', data);

        if (data.message === 'User registered successfully') {
            alert('User registered successfully');
        } else {
            alert('Error registering user - ' + data.message);
        }
        } catch (error) {
            console.error('Error registering user:', error);
        }
  };

    return (
        <div className="login-container">
            <h2>Create an Account</h2>
            <form onSubmit={handleRegister}>
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
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="login-button">Register</button>
            </form>
            <p>Already have an account? <a href="/login">Login</a></p>
        </div>
  );
}

export default Register;
// test