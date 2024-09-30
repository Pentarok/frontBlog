import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const useAuth = () => {
  const [session, setSession] = useState(false); // Store session status
  const [error, setError] = useState(false); // Handle errors
  const [user, setUser] = useState(null); // Store user data
  const [loading, setLoading] = useState(true); // Track loading state
  const navigate = useNavigate();
  const serverUri = import.meta.env.VITE_SERVER;

  const validateUser = async () => {
    const serverUri='https://mern-blog-6mdu.vercel.app';
    try {
      const res = await axios.get(`${serverUri}/verifyuser`, { withCredentials: true });
      console.log(res)

      // Check the response data structure
      if (res.data.message === 'Success') {
        setSession(true); 
        setError(false);
        setUser(res.data.user.author); // Ensure this matches your backend response
      } else {
        if (res.data === 'Token is missing') {
          navigate('/login');
          setError(false);
        } else {
          setError(true);
        }
      }
    } catch (error) {
      console.log(error);
      setError(true);
    } finally {
      setLoading(false); // Set loading to false once validation is done
    }
  };

  useEffect(() => {
    validateUser();
  }, []);

  return { user, error, session, loading }; // Return loading state
};

export default useAuth;
