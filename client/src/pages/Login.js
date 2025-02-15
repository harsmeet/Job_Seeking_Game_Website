import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import Toast from '../components/Toast'; // Import Toast component
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [toastMessage, setToastMessage] = useState(null); // For toast messages
  const [toastType, setToastType] = useState(''); // 'success' or 'error'
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/login', {
        email,
        password
      });
      const { userType } = response.data;
      localStorage.setItem('userType', userType); // Store userType in localStorage
      setToastType('success');
      setToastMessage('Login Successful!');
      localStorage.setItem('token', response.data.token); // Save token to localStorage
      setTimeout(() => navigate('/homepage'), 3000); // Navigate to homepage after 3 seconds
    } catch (error) {
      setToastType('error');
      setToastMessage('Login Failed. Please check your credentials.');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Welcome Back!</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="login-btn">Login</button>
        </form>
        <p className="register-redirect">
          New here?{' '}
          <span className="register-link" onClick={() => navigate('/registration')}>
            Create an account
          </span>
        </p>
      </div>

      {/* Show Toast Message */}
      {toastMessage && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setToastMessage(null)} // Close the toast
        />
      )}
    </div>
  );
}

export default Login;
