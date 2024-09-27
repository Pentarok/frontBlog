
import React, { useEffect, useState } from 'react';
import './posts.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ThreeDots } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify'; 
import axios from 'axios';
import UserProfile from './DisplayLinks';

const AdminPosts = () => {
  const [posts, setPosts] = useState([]);

  const serverUri = process.env.REACT_APP_SERVER;


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
},[posts])
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
    color="white"
    ariaLabel="three-dots-loading"
  /></div>; // Handle loading state if userInfo is null
}
 
  // Conditional rendering for empty posts or loading state
  if (!posts || posts.length === 0) {
    return <p className='text-white text-center'>No posts available</p>;
  }
  const deletePost = async (postId, i) => {
    try {
      const res = await axios.post(`${serverUri}/posts/${postId}`);
      if (res.data.status === 'Ok') {
        const updatedPosts = posts.filter((_, index) => index !== i);
        setPosts(updatedPosts);
        toast.success('Post deleted successfully!', { autoClose: 3000 });
      } else {
        console.log(res)
        toast.error('An error occurred!', { autoClose: 3000 });
      }
    } catch (error) {
        console.log(error)
      toast.error('An error occurred while deleting the post!', { autoClose: 3000 });
    }
  };

  return (
    <div>
      {posts.map((post, i) => (
        <div className="larger-container" key={i}>
              <button onClick={() => deletePost(post._id, i)} className="btn btn-danger">
              Delete Post
            </button>
          <div className="image-content-wrapper">
            {post.file!==null?
            <div className="image">
              <img src={post.file} alt="" />
             
            </div>
             :null}
            <div className="content">
              <h5 className='text-success'>{post.title}</h5>
              <div
                className="text-white"
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
      <ToastContainer/>
    </div>

  );
};

export default AdminPosts;
