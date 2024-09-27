import React, { createContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

import './homepage.css';
import './posts.css'
import { ThreeDots } from 'react-loader-spinner';
import Posts from './posts';
import ResponsiveAppBar from './homeNavbar';
 export const PostContext = createContext()
const homepage = () => {
const [posts,setPosts]=useState([])
const [loading,setLoading]=useState(false)

const serverUri = import.meta.env.VITE_SERVER;


const fetchPosts = async ()=>{
  
  try {
    setLoading(true);
  const res = await   fetch(`${serverUri}/posts`);
  const posts = await res.json();
  
  setPosts(posts.posts);
  setLoading(false)
  } catch (error) {
    console.log(error)
  }
  
}
  useEffect( ()=>{
   fetchPosts();

  },[])

  useEffect(()=>{
 console.log(posts)
  },[posts])

  if(loading){
    return <div className='text-center text-white d-flex justify-content-center align-items-center'> <ThreeDots
    height="80"
    width="80"
    radius="9"
    color="white"
    ariaLabel="three-dots-loading"
  /></div>; // Handle loading state if userInfo is null
}
 
  return (
    <div>

<div style={{padding:'20px'}}>
    
<PostContext.Provider value={posts}>
 
 <Posts/>
 </PostContext.Provider>
 
</div>
    </div>
  )
}

export default homepage;