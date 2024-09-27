
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';
import './register.css';

const Adduser = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const serverUri = 'http://localhost:3000';
  const [country, setCountry] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state
  const [termsAgreed, setTermsAgreed] = useState(false); // Add state for terms and conditions checkbox
const navigate= useNavigate();
  const handleRegister =  (e) => {
  try{e.preventDefault();
    axios.post( `${serverUri}/register` ,{username,email,country}).then(result=> console.log(result)).catch(
      error=> console.log(error)
    )}catch{
      err=>console.log(err)
    }
    finally{
      setCountry('');
      setEmail('');
      setUsername('')
      navigate('/users');
    }
  };

  return (
    <div className="register-form">
        <h2>Add user</h2>
        {message && (
          <div className={`message ${message.includes('success') ? 'success' : 'error'}`}>
            {message}
          </div >
      )}
      <form onSubmit={handleRegister} className='register-form'>
        <input
          type="text"
          value={username}
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
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          placeholder="Country"
          required
        />
       

       

        
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Submit'}
        </button>

      </form>
    </div>
  );

}
export default Adduser;
