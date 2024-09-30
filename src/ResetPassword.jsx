import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Icon } from '@mui/material';
import './login.css';
import axios from 'axios';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // State for confirming password
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [passwordMismatch, setPasswordMismatch] = useState(''); // State for mismatch error message
  const navigate = useNavigate();
  const serverUri = 'https://mern-blog-6mdu.vercel.app';
  const { id, token } = useParams();

  const handleSend = async (e) => {
    e.preventDefault();  // Prevent the default form submission behavior
    
    // Check if passwords match before making API call
    if (password !== confirmPassword) {
      setPasswordMismatch('Passwords do not match'); // Set mismatch error
      return; // Prevent API call if passwords don't match
    }
    
    try {
      setLoading(true);  // Start loading
      setPasswordMismatch(''); // Clear any previous mismatch error
      
      // Make the POST request to your API
      const res = await axios.post(`${serverUri}/reset-password/${id}/${token}`, { password }, { withCredentials: true });
      console.log(res);

      // If successful, set a success message or redirect the user
      if(res.data.status="Ok"){
         setMessage('Password successfully updated!');
        setTimeout(() => {
         setMessage("")
                navigate('/login');  // Redirect user to login page after successful password reset
}, 3000);
      }
     

    
    } catch (error) {
      console.error(error);
      // Update state to reflect an error, e.g., set an error message
      setMessage('An error occurred while resetting the password');
   
    } finally {
      setLoading(false);  // Stop loading
    }
  };
  
  return (
    <div className="login-container">
      <h2>Enter New Password</h2>
      {message && <p>{message}</p>} {/* Display error or success message */}
      {passwordMismatch && <p style={{ color: 'red' }}>{passwordMismatch}</p>} {/* Display password mismatch error */}
      
      <form onSubmit={handleSend} className='login-form'>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          style={{ width: '100%' }}
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          required
          style={{ width: '100%', marginTop: '10px' }} // Style for better spacing
        />
        
        <button type="submit" disabled={loading} style={{position:'relative', left:'0px'}}>
          {loading ? 'Loading...' : 'Send'}
        </button>
        
      </form>
    </div>
  );
};

export default ResetPassword;
