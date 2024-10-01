
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Icon } from '@mui/material';
import './login.css';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(''); // Stores message for alerts
  const [isSuccess, setIsSuccess] = useState(false); // To determine alert type (success/error)
  const navigate = useNavigate();

  const handleLogin = (e) => {
    const serverUri = 'https://mern-blog-6mdu.vercel.app';
    e.preventDefault();
    setLoading(true); // Show loading state while making the request
    setMessage(''); // Clear any previous message

    axios.post(`${serverUri}/login`, { email, password }, { withCredentials: true, timeout: 15000 })
      .then(res => {
        setLoading(false); // Stop loading once we get a response
        console.log(res);

        if (res.data.status === '405') {
          setMessage(res.data.message); // Show error message
          setIsSuccess(false); // Set to error

          setTimeout(() => {
            setMessage('');
          }, 2000);
        } else {
          setMessage('Login successful!'); // Show success message
          setIsSuccess(true); // Set to success

          // Store token and user data in localStorage
          localStorage.setItem('token', res.data.token); // Assuming token is sent in the response
          localStorage.setItem('userId', res.data.user._id); // Assuming user ID is sent in the response

          // Navigate based on user role
          if (res.data.user.role === 'admin') {
            navigate('/dashboard');
          } else {
            navigate('/user');
          }
        }
      })
      .catch(err => {
        setLoading(false); // Stop loading if there's an error
        console.log(err);
        setMessage('Invalid credentials. Please try again.'); // Show error message
        setIsSuccess(false); // Set to error
      });
  };

  return (
    <div className='main-container'>
      <div className="login-container">
        <h2 className='text-dark'>Login</h2>

        {/* Display success or error message */}
        {message && (
          <div className={`${isSuccess ? 'success' : 'error'} message`}>
            <p className='text-white'>{message}</p>
          </div>
        )}

        <form onSubmit={handleLogin} className='login-form'>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            style={{ width: '100%' }}
          />
          <div className="password-container">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="password-input"
            />
            <Icon
              aria-label="toggle password visibility"
              onClick={() => setShowPassword(!showPassword)}
              className="password-icon"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </Icon>
          </div>
          <button type="submit" disabled={loading} style={{ position: 'relative', left: '0px' }}>
            {loading ? 'Loading...' : 'Login'}
          </button>
          <p>
            Don't have an account? <Link to="/signup">Register here</Link>
          </p>
          <p>
            <Link to="/forgot-password">Forgot Password?</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;

