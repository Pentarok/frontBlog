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
  const [showBrowserMessage, setShowBrowserMessage] = useState(false);

  const contextData = {
    user,
    session,
    error
  };

  const detectInAppBrowser = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (/FBAN|FBAV|Instagram|WhatsApp/.test(userAgent)) {
      setShowBrowserMessage(true);
    }
  };

  const openInBrowser = () => {
    const externalBrowserLink = 'https://front-blog-theta.vercel.app';
    window.location.href = externalBrowserLink;
  };

  useEffect(() => {
    detectInAppBrowser();
  }, []);

  useEffect(() => {
    if (!loading) {
      if (!session) {
        navigate('/login');
      }
    }
  }, [session, navigate, loading]);

  if (loading) {
    return <div>Loading...</div>;
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
    <UserContext.Provider value={contextData}>
      <ResponsiveAppBar />
      <div className="content" style={{ padding: '30px' }}>
        <Outlet />
      </div>
    </UserContext.Provider>
  );
};

export default Layout;
