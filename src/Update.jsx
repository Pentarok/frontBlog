
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './register.css';

const Update = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [user,setUser]=useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state
  const [termsAgreed, setTermsAgreed] = useState(false); // Add state for terms and conditions checkbox
  const navigate = useNavigate();

  const {id}=useParams();
  const handleUpdate =  (e) => {
    e.preventDefault();
  axios.put('http://127.0.0.1:3000/users/update/'+id,{username,email,country}).then(
    navigate('/users')
  ).catch(err=>console.log(err))
  
  };
useEffect(()=>{
  axios.get('http://127.0.0.1:3000/users/update/'+id).then(
    result=>{setUsername(result.data.username),
  setCountry(result.data.country),
  setEmail(result.data.email)}
)
  .catch(
    error=> console.log(error)
  )
},[])
  return (
    <div className="register-form">
        <h2>Update User Info</h2>
        {message && (
          <div className={`message ${message.includes('success') ? 'success' : 'error'}`}>
            {message}
          </div >
      )}
      <form onSubmit={handleUpdate} className='register-form'>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
         
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}

          required
        />
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          
          required
        />
       

       

        
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Update'}
        </button>

      </form>
    </div>
  );

}
export default Update;
