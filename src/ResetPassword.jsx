import React, { useState, useEffect } from  'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Icon } from '@mui/material';
import './login.css';

import axios from 'axios';
const ResetPassword = () => {
  const [password, setPassword] = useState('');
 const [loading,setLoading]=useState(false);
  const [message, setMessage] = useState('');
 const navigate = useNavigate();
 
 const serverUri = import.meta.env.VITE_SERVER;


const {id, token}=useParams();
  const handleSend = async (e) => {
    e.preventDefault();  // Prevent the default form submission behavior
    try {
      setLoading(true);  // Start loading
  
      // Make the POST request to your API
      const res = await axios.post(`${serverUri}/reset-password/${id}/${token}`, { password }, { withCredentials: true });
  
      console.log(res);
   
    
    } catch (error) {
      console.error(error);
      // Update state to reflect an error, e.g., set an error message
   
    } finally {
      setLoading(false);  // Stop loading
    }
  };
  
  
  return (
    <div className="login-container">
      <h2>Enter New Password</h2>
      {message && <p>{message}</p>} {/* Display error or success message */}
      <form onSubmit={handleSend} className='login-form'>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          style={{ width: '100%' }}
        />
        
        <button type="submit" disabled={loading} style={{position:'relative',
          left:'0px'
        }}>
          {loading ? 'Loading...' : 'Send'}
        </button>
        
       
      </form>
    </div>
  );
};

export default ResetPassword;
