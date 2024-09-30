import React, { useState, useEffect } from  'react'
import { Link, useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { ThreeDots } from 'react-loader-spinner';
import { Icon } from '@mui/material';
import './login.css';
import axios from 'axios';
const ForgotPassword = () => {
  const [email, setEmail] = useState('');
 const [loading,setLoading]=useState(false);
  const [message, setMessage] = useState('');
  const [success,setSuccess]=useState(null);
  const serverUri = 'https://mern-blog-6mdu.vercel.app';

 const navigate = useNavigate();
  
  
  /* const handleLogin = async (e) => {
    e.preventDefault();
    console.log({  email, password }); // Log data before sending it
   
    await axios.post('http://127.0.0.1:3000/login', { email, password }, { withCredentials: true })

    .then(res => {
     
        console.log(res.data);
        setMessage(res.data);
        if(res.data.status=='OK'){
          if(res.data.user.role=='visitor'){
            navigate('/homepage')
          }else{
            navigate('/dashboard')
          }
        }else{

        }
       
    })
    .catch(err => {
        console.error('Sign-up error:', err);
        setMessage('Error during login');
    });
  };
 */
const clearMessage = (time)=>{
  setTimeout(() => {
    setMessage('')
  }, time);
}
  const handleSend = async (e) => {
    e.preventDefault();  // Prevent the default form submission behavior
    try {
      setLoading(true);  // Start loading
  
      // Make the POST request to your API
      const res = await axios.post(`${serverUri}/forgot-password`, { email }, { withCredentials: true });
  
      console.log(res);
  
      if (res.data=='success') {
        setSuccess(true);
        // Update state to reflect success, e.g., set a message
        setMessage('A link to reset your password has been sent to your email');
        setEmail('')
        setLoading(false)
        clearMessage(6000)
      }else{
        setSuccess(false)
        setLoading(false)
        setMessage('An error occured');
        clearMessage(5000)
      }
    } catch (error) {
      console.error(error);
      // Update state to reflect an error, e.g., set an error message
      setMessage('An error occured');
      setLoading(false)
      clearMessage(5000)
      setSuccess(false)
    } finally {
      setLoading(false);  // Stop loading
    }
  };
  
  
  return (
    <div style={{padding:'20px'}}>
    <div className="login-container">
      <h2>Enter Email</h2>
      {message && <div className={success?' message success':'message error'}> <p>{message}</p></div>}
      <form onSubmit={handleSend} className='login-form'>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          style={{ width: '100%' }}
        />
        
       
          {loading ? 
           <div className='text-center text-white d-flex justify-content-center align-items-center'> <ThreeDots
           height="80"
           width="80"
           radius="9"
           color="blue"
           ariaLabel="three-dots-loading"
         /></div> : 
          <button type="submit" disabled={loading} style={{position:'relative',
          left:'0px'
        }}>Send</button>}
        
        
       
      </form>
    </div>
    </div>
  );
};

export default ForgotPassword;
