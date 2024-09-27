
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './register.css';
import './signUp.css';
import 'bootstrap/dist/css/bootstrap.min.css';
const SignUp = () => {
  const [name, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showMessage,setShowMessage]=useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false); // Add loading state
  const [termsAgreed, setTermsAgreed] = useState(false); // Add state for terms and conditions checkbox

  const serverUri = import.meta.env.VITE_SERVER;


  const handleSignUp = (e) => {
    e.preventDefault(); // Prevent form submission
  
    if (!termsAgreed) {
      setMessage('You must agree to the terms and conditions');
      setIsSuccess(false); // Mark this as an error message
      setTimeout(() => {
        setMessage(''); // Clear the message after 2 seconds
      }, 2000);
      return; // Exit the function if terms are not agreed
    }
  
    axios.post(`${serverUri}/signup`, { name, email, password })
      .then((res) => {
        console.log(res);
  
        if (res.data === 'Ok') {
          setMessage('User registered successfully');
          setIsSuccess(true); // Mark this as a success message

          setUsername('');
          setEmail('');
          setPassword('');
          setTermsAgreed(false)
        } else if (res.data.error) {
          setMessage(res.data.error);
          setIsSuccess(false); // Mark this as an error message
        } else {
          setMessage('An error occurred during registration');
          setIsSuccess(false); // Mark this as an error message
        }
  
        setTimeout(() => {
          setMessage('');
        }, 2000);
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.error) {
          setMessage(err.response.data.error);
          setIsSuccess(false); // Mark this as an error message
        } else {
          setMessage('An error occurred. Please try again.');
          setIsSuccess(false); // Mark this as an error message
        }
  
        setTimeout(() => {
          setMessage('');
        }, 2000);
      });
  };
  const handleTerms = (e)=>{
    console.log(termsAgreed)
   setTermsAgreed(!termsAgreed)
   
  }
  useEffect(()=>{
    console.log(termsAgreed)
  },[termsAgreed])
  return (
    <div className="Sign Up-form">
      <h2 className='text-dark'>Sign Up</h2>
   
      <form onSubmit={handleSignUp} className='register-form'>
      {message && (
  <div className={`${isSuccess ? 'success' : 'error'} message`}>
    <p className='text-white'>{message}</p>
  </div>
)}

        <input
          type="text"
          value={name}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <div>

       <div className='terms-checkbox'>
       
                <div>
                <input
            type="checkbox"
            checked={termsAgreed}
            onChange={handleTerms}
         
          />      
                </div>
                <div>
                I agree to the <Link to="/terms">Terms and Conditions</Link>
                </div>
    </div>
       </div>

        
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
        <p className="login-link">
          Already have an account? <Link to='/login'>Login</Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
