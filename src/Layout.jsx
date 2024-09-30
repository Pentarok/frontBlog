// Layout.js
import React, { createContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import ResponsiveAppBar from './NavigationBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Link } from 'react-router-dom';


const Layout = () => {

    const navigate=useNavigate();
  const serverUri = import.meta.env.VITE_SERVER;
  const [error,setError]=useState(false)
 const validateUser=async ()=>{
  try {
    const res= await axios.get(`${serverUri}/verifyuser`,{  withCredentials: true });
    console.log(res)
    if(res.data !=="Success"){
       setError(true) 
    }
   
   } catch (error) {
     console.log(error)
     setError(true)
   }
 }
 useEffect(()=>{
validateUser();
 },[]) 
 if(error){
  return <div className='d-flex justify-content-center align-items-center flex-column vh-100'>
  <div className='text-white mb-3'>An error occurred!</div>
  <div>
    <Link className='btn btn-primary text-white' to='/login'>Please try logging in again</Link>
  </div>
</div>


 }
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
