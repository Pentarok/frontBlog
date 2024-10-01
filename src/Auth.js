import { useState, useEffect } from 'react';
import axios from 'axios';

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const token = localStorage.getItem('token'); // Get token from localStorage
        if (token) {
          // Verify the token with the server
          const response = await axios.get('https://mern-blog-6mdu.vercel.app/verifyuser', {
            headers: {
              Authorization: `Bearer ${token}` // Pass the token in Authorization header
            }
          });
          console.log(response)
          if (response.data && response.data.user) {
            setUser(response.data.user);
            setSession(true);
          } else {
            setSession(false);
          }
        } else {
          setSession(false);
        }
      } catch (err) {
        setError(err);
        setSession(false);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  return { user, session, error, loading };
};

export default useAuth;
