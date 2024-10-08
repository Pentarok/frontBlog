
import React, { useEffect, useState } from 'react';
import './posts.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import { ThreeDots } from 'react-loader-spinner';

import UserProfile from './DisplayLinks';

const Posts = () => {

  const serverUri = 'https://mern-blog-6mdu.vercel.app';



  const [posts, setPosts] = useState([]);
  const [loading,setLoading]=useState(false)
  // Fetch posts directly inside the Posts component
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${serverUri}/posts`);
      const data = await res.json();
      
      setPosts(data.posts); // Update the posts state
      setLoading(false);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    fetchPosts(); // Fetch posts on component mount
  }, []);
useEffect(()=>{
  console.log(posts)
},[])
  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true, // 12-hour clock (AM/PM)
    };
    return date.toLocaleString('en-US', options);
  }

  if(loading){
    return <div className='text-center text-white d-flex justify-content-center align-items-center'> <ThreeDots
    height="80"
    width="80"
    radius="9"
    color="blue"
    ariaLabel="three-dots-loading"
  /></div>; // Handle loading state if userInfo is null
}
 
  // Conditional rendering for empty posts or loading state
  if (!posts || posts.length === 0) {
    return <p className='text-dark text-center'>No posts available</p>;
  }

  return (
    <div>
      <h1 className='text-center' style={{color:'purple'}}>Posts</h1>
      {posts.map((post, i) => (
        <div className="larger-container" key={i}>
          <div className="image-content-wrapper">
            {post.file!==null ?
            <div className="image">
              
            <img src={post.file} alt="" />
</div>:null
 
            }
           
            <div className="content">
              <h5 className='text-success'>{post.title}</h5>
              <div
                className=""
                dangerouslySetInnerHTML={{ __html: post.content }}
              ></div>
              <div className="author">
                <p className="text-dark">
                  By &nbsp;<i>{post.author}</i>
                </p>
                <p className="text-dark">
                  Posted <span className="date-info">{formatDate(post.createdAt)}</span>
                </p>
              </div>
            </div>
          </div>
          <div>


          </div>
        
        </div>
      ))}
    </div>
  );
};

export default Posts;
