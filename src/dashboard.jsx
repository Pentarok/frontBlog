import axios from 'axios'
import React, { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import AdminPosts from './AdminPosts';
import ResponsiveAppBar from './AdminNav';

const Dashboard = () => {
const navigate = useNavigate();
useEffect(()=>{
  const serverUri = process.env.REACT_APP_SERVER;

  axios.get(`${serverUri}/dashboard`,{withCredentials:true})
  .then(
    res=>{
      console.log(res)
      if(res.data=="success"){
        
      }else{
         navigate('/login'); 
      }
    }
  )
})
  return (
    <div>
      <ResponsiveAppBar/>
      <AdminPosts/>
    </div>
  )
}

export default Dashboard;