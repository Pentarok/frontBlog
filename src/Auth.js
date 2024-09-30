import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const useAuth = () => {
  const [session, setSession] = useState(false); // Store session status
  const [error, setError] = useState(false); // Handle errors
  const [user, setUser] = useState(null); // Store user data
  const navigate = useNavigate();
  const serverUri = import.meta.env.VITE_SERVER;

  const validateUser = async () => {
    try {
      const res = await axios.get(`${serverUri}/verifyuser`, { withCredentials: true });
      console.log(res)
      if (res.data.message === 'Success') {
      
      
        setSession(true); 
        setError(false);
        setUser(res.data.user.author);
      } else {
        if (res.data === 'Token is missing') {
           navigate('/login'); 
           setError(false)
        } else {
          setError(true);
        }
      }
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  useEffect(() => {
    validateUser();
  }, []);

  return { session, error, user }; // Return user data along with session and error status
};

export default useAuth;
