import React, { createContext, useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import ResponsiveAppBar from './NavigationBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import useAuth from './Auth';

export const UserContext = createContext();

const Layout = () => {
  const navigate = useNavigate();
  const { session, error, user, loading } = useAuth();
  const [showBrowserMessage, setShowBrowserMessage] = useState(false); // State to manage in-app browser detection

  const contextData = {
    user,
    session,
    error
  };

  // Function to detect if the site is opened in an in-app browser
  const detectInAppBrowser = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // Check for Facebook, Instagram, WhatsApp in-app browsers
    if (/FBAN|FBAV|Instagram|WhatsApp/.test(userAgent)) {
      setShowBrowserMessage(true); // Show message if an in-app browser is detected
    }
  };

  // Redirect the user to open in the external browser
  const openInBrowser = () => {
    const url = window.location.href; // Get the current URL
    window.open(url, '_blank'); // Open the URL in an external browser
  };

  useEffect(() => {
    detectInAppBrowser();
  }, []);

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

  // Show in-app browser message if detected
  if (showBrowserMessage) {
    return (
      <div className='d-flex justify-content-center align-items-center flex-column vh-100'>
        <div className='text-white mb-3'>
          It looks like you're trying to open this site in an in-app browser. For the best experience, please open it in a full browser.
        </div>
        <button className='btn btn-primary' onClick={openInBrowser}>Open in Browser</button>
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
