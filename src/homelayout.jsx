// Layout.js
import React, { createContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import ResponsiveAppBar from './homeNavbar';



const HomeLayout = () => {

  
  return (
    <div>
       
      <ResponsiveAppBar />
     
      <div className="content" style={{padding:'30px'}}>
        <Outlet />
      </div>
    </div>
  );
};

export default HomeLayout;
