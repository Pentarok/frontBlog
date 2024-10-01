import React, { useContext } from 'react';
import { UserContext } from './Layout';
import 'bootstrap/dist/css/bootstrap.min.css';

const UserIntro = () => {
  const { user } = useContext(UserContext);

  return (
    <div>
      <div>
        {user ? ( // Check if user exists
          <h5 className='text-center'>Hello, welcome back &nbsp;{user.name}</h5> // Display user email
        ) : (
          <h5 className='text-center'>Hello, welcome back!</h5> // Default message if no user data
        )}
      </div>
      <div className="info-container">
        {/* Render additional dynamic content here if needed */}
      </div>
    </div>
  );
};

export default UserIntro;
