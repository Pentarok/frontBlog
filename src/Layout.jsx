import React, { createContext, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import ResponsiveAppBar from './NavigationBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import useAuth from './Auth';

export const UserContext = createContext();

const Layout = () => {
  const navigate = useNavigate();
  const { session, error, user, loading } = useAuth();

  const contextData = {
    user,
    session,
    error
  };

  useEffect(() => {
    // Navigate only if not loading and session is not set
    if (!loading && !session) {
      navigate('/login');
    }
  }, [session, navigate, loading]);

  if (loading) {
    return <div>Loading...</div>; // Optionally show a loading state
  }

  if (error) {
    return (
      <div className='d-flex justify-content-center align-items-center flex-column vh-100'>
        <div className='text-white mb-3'>An error occurred!</div>
        <div>
          <Link className='btn btn-primary text-white' to='/login'>Please try logging in again</Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <UserContext.Provider value={contextData}>
        <ResponsiveAppBar />
        <div className="content" style={{ padding: '30px' }}>
          <Outlet />
        </div>
      </UserContext.Provider>
    </div>
  );
};

export default Layout;
