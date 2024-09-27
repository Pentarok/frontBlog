// Layout.js
import React, { createContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import ResponsiveAppBar from './NavigationBar';



const Layout = () => {

  
  return (
    <div>
       
      <ResponsiveAppBar />
     
      <div className="content" style={{padding:'30px'}}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
