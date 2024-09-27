/* import React, { useContext, useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import './posts.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles
import { ThreeDots } from 'react-loader-spinner';
const UserBlogs = () => {
    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          hour12: true
        };
        return date.toLocaleString('en-US', options);
    }

    const [posts, setPosts] = useState([]);
    const [noPosts,setNoPosts]=useState(false)
    const [loading,setLoading]=useState(false);
    const [userInfo, setUserInfo] = useState(null); // Changed to null to indicate uninitialized state
    useEffect(() => {
        axios.get('http://localhost:3000/user', { withCredentials: true })
          .then(res => {
            const { email, id, author } = res.data;
            setUserInfo({ email, id, author }); // Store data as an object instead of array for better clarity
          })
         
      }, []);

      
    const fetchUserPosts = async () => {
        try {
            setLoading(true)
        const id = userInfo.id;
        const res = await axios.get(`http://localhost:3000/posts/${id}`);
       console.log(res)
       setPosts(res.data)
        setLoading(false)
        } catch (error) {
            console.log(error)
        }
        
    }
    useEffect(()=>{
        if(userInfo){
            fetchUserPosts();
        }else{
            setNoPosts(false);
        }
       
      },[userInfo])
  
  
    if (!userInfo) {
    
    }
  
if(loading){
    return <div className='text-center text-white d-flex justify-content-center align-items-center'> <ThreeDots
    height="80"
    width="80"
    radius="9"
    color="white"
    ariaLabel="three-dots-loading"
  /></div>; 
}
 

  

    const deletePost = async (postId, index) => {
        try {
            const res = await axios.post(`http://localhost:3000/posts/${postId}`); // Use DELETE method
            console.log(res.data);

            if (res.data.status === 'Ok') {
                const updatedPosts = posts.filter((_, i) => i !== index);
                setPosts(updatedPosts);

                // Trigger toast notification on success
                toast.success('Post deleted successfully!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else {
                // Handle error response
                toast.error('An error occurred!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        } catch (error) {
            // Handle error
            toast.error('An error occurred while deleting the post!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

  
    return (
        <div className="container">
            <ToastContainer /> 
            {posts && (
                <div>
                    {posts && posts.length >= 1 ? (
                        posts.map((post, index) => (
                            <div className="larger-container" key={index}>
                                <div className="edit-wrapper">
                                    <div>
                                        <Link to={`/edit/${post._id}`} className="btn btn-success">
                                            <FontAwesomeIcon icon={faPenToSquare} />
                                        </Link>
                                    </div>
                                    <div>
                                        <button
                                            onClick={() => deletePost(post._id, index)}
                                            className="btn btn-danger"
                                        >
                                            Delete Post
                                        </button>
                                    </div>
                                </div>

                                <div className="image-content-wrapper">
                                    <div className="image">
                                        <img src={`http://localhost:3000/${post.file}`} alt="" />
                                    </div>
                                    <div className="content-container">
                                        <div className="content-wrapper">
                                                <div
                                                    className="content"
                                                    dangerouslySetInnerHTML={{ __html: post.content }}
                                                ></div>
                                                </div>
                                        <div className="author">
                                            <p className="text-white">
                                                By &nbsp;<i>{post.author}</i>
                                            </p>
                                            <p className='text-white'>
                                                Posted{" "}
                                                <span className="text-white">
                                                    {formatDate(post.createdAt)}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        
                        <div>
                        <h4 className='text-center text-white'>Ooops, you have no posts yet!</h4>
                    </div>
                        
                    )}
                </div>
            )}
            {noPosts && (
                 <div>
                 <h4 className='text-center text-white'>Ooops, you have no posts yet!</h4>
             </div>
            )}
        </div>
    );
};

export default UserBlogs;*/
/* import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './posts.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import { ThreeDots } from 'react-loader-spinner';
import SocialLinksForm from './socialLinks';

const UserBlogs = () => {
    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          hour12: true
        };
        return date.toLocaleString('en-US', options);
    }

    const [posts, setPosts] = useState([]);
    const [noPosts, setNoPosts] = useState(false);
    const [loading, setLoading] = useState(false);
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:3000/user', { withCredentials: true })
          .then(res => {
            const { email, id, author } = res.data;
            setUserInfo({ email, id, author });
          });
    }, []);

    const fetchUserPosts = async () => {
        try {
            setLoading(true);
            const userId = userInfo.id;
            const res = await axios.get(`http://localhost:3000/userposts/${userId}`);
            setPosts(res.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (userInfo) {
            fetchUserPosts();
        } else {
            setNoPosts(false);
        }
        
    }, [userInfo]);

    const deletePost = async (postId, index) => {
        try {
            const res = await axios.post(`http://localhost:3000/posts/${postId}`);
            if (res.data.status === 'Ok') {
                const updatedPosts = posts.filter((_, i) => i !== index);
                setPosts(updatedPosts);
                toast.success('Post deleted successfully!', { autoClose: 3000 });
            } else {
                toast.error('An error occurred!', { autoClose: 3000 });
            }
        } catch (error) {
            toast.error('An error occurred while deleting the post!', { autoClose: 3000 });
        }
    };

    if (loading) {
        return <div className='text-center text-white d-flex justify-content-center align-items-center'>
            <ThreeDots height="80" width="80" radius="9" color="white" ariaLabel="three-dots-loading" />
        </div>;
    }

    return (
        <div className="container">
            <ToastContainer />
            {posts && (
                <div>
                    {posts.length >= 1 ? (
                        posts.map((post, index) => (
                            <div className="larger-container" key={index}>
                                <div className="edit-wrapper">
                                    <Link to={`/edit/${post._id}`} className="btn btn-success">
                                        <FontAwesomeIcon icon={faPenToSquare} />
                                    </Link>
                                    <button onClick={() => deletePost(post._id, index)} className="btn btn-danger">
                                        Delete Post
                                    </button>
                                </div>

                                <div className="image-content-wrapper">
                                    <div className="image">
                                        <img src={`http://localhost:3000/${post.file}`} alt="" />
                                    </div>
                                    <div className="content-container">
                                        <div className="content-wrapper">
                                            <div className="content" dangerouslySetInnerHTML={{ __html: post.content }}></div>
                                        </div>
                                        <div className="author">
                                            <p>By <i>{post.author}</i></p>
                                            <p>Posted <span>{formatDate(post.createdAt)}</span></p>
                                        </div>
                                        <div className="socialLinks">
                                            <SocialLinksForm postId={post._id}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <h4 className="text-center text-white">Ooops, you have no posts yet!</h4>
                    )}
                </div>
            )}
        </div>
    );
};

export default UserBlogs;
 */

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

const UserBlogs = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
 
  const serverUri = import.meta.env.VITE_SERVER;


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
      const serverUri=process.env.SERVER;
      const res = await axios.post(`${serverUri}/posts/${postId}`);
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
      <div className='text-center text-white d-flex justify-content-center align-items-center'>
        <ThreeDots
          height="80"
          width="80"
          radius="9"
          color="white"
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
        </div>
      ))}
    </div>
  );
};

export default UserBlogs;
