
import React, { useEffect, useState } from 'react';
import './posts.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import SocialLinksForm from './socialLinks';
import { ThreeDots } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import UserProfile from './DisplayLinks';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import useAuth from './Auth';

const UserBlogs = () => {


 
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
 
  const serverUri = 'https://mern-blog-6mdu.vercel.app';


  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${serverUri}/posts`);
      const data = await res.json();
      setPosts(data.posts);
      setLoading(false);
      console.log(data.posts)
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const deletePost = async (postId, i) => {
    try {

      const res = await axios.post(`${serverUri}/posts/${postId}`);
      console.log(res)
      if (res.data.status === 'Ok') {
        const updatedPosts = posts.filter((_, index) => index !== i);
        setPosts(updatedPosts);
        toast.success('Post deleted successfully!', { autoClose: 3000 });
      } else {
        toast.error('An error occurred!', { autoClose: 3000 });
      }
    } catch (error) {
      toast.error('An error occurred while deleting the post!', { autoClose: 3000 });
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };
    return date.toLocaleString('en-US', options);
  }

  if (loading) {
    return (
      <div className='text-center d-flex justify-content-center align-items-center'>
        <ThreeDots
          height="80"
          width="80"
          radius="9"
          color="blue"
          ariaLabel="three-dots-loading"
        />
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return <p className='text-dark text-center'>No posts available</p>;
  }

  return (
    <div>
      

      {posts.map((post, i) => (
        <div className="larger-container" key={i}>
          <div className="edit-wrapper">
            <Link to={`/edit/${post._id}`} className="btn btn-success">
              <FontAwesomeIcon icon={faPenToSquare} />
            </Link>
            <button onClick={() => deletePost(post._id, i)} className="btn btn-danger">
              Delete Post
            </button>
          </div>
          <div className="image-content-wrapper">
       {post.file!==null?
            <div className="image">
              
            <img src={post.file} alt="" />
</div>
 :null}
            
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
        </div>
      ))}
    </div>
  );
};

export default UserBlogs;
