import React, { useEffect, useRef, useState } from 'react';
import './userpage.css';
import axios from 'axios';
import placeholder from './assets/placeholder.jpg'; // Import placeholder image
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import { ToastContainer, toast } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles
import useAuth from './Auth';

const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'color',
];

const UserCreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState('');
  const [imageUrl, setImageUrl] = useState(placeholder); // State for image URL
  const [isSubmitting, setIsSubmitting] = useState(false); // Track post creation state

  const serverUri = 'https://mern-blog-6mdu.vercel.app'


  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    // Create a URL for the selected file and set it to the imageUrl state
    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile);
      setImageUrl(url);
    } else {
      // Set placeholder if no file is selected
      setImageUrl(placeholder);
    }
  };

  const inputRef = useRef(null);

  const CreatePost = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Set loading state

    const data = new FormData();
    data.append('file', file);
    data.append('content', content);
    data.append('title', title);
    data.append('summary', summary);

    // Create an AbortController
    const controller = new AbortController();
    const signal = controller.signal;

    // Timeout to abort the request after 5 seconds
    const timeoutId = setTimeout(() => {
      controller.abort();
    }, 50000);

    try {
      const res = await fetch(`${serverUri}/posts`, {
        credentials: 'include',
        method: 'POST',
        body: data,
        signal, // Pass the signal to the request
      });

      clearTimeout(timeoutId); // Clear timeout if request is successful

      const result = await res.json();
      console.log(result);

      if (result.status === 'Ok') {
        toast.success('Post created successfully!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        // Clear the form fields
        setContent('');
        setFile(null);
        setTitle('');
        setSummary('');
        inputRef.current.value = ''; // Clear file input
      } else {
        toast.error('An error occurred. Please try again.', {
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
      if (error.name === 'AbortError') {
        toast.error('Request timed out. Check your internet connection and try again.', {
          position: "bottom-center",
          
          autoClose: 12000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        console.error('Error creating post:', error);
        toast.error('Error creating post, please try again later.', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } finally {
      setIsSubmitting(false); // Reset loading state
    }
  };

  return (
    <div>
      <ToastContainer /> {/* Add ToastContainer to render toasts */}
      <form action="" onSubmit={CreatePost}>
        <div className="form-wrapper">
          <div className="form-container">
            <div>
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Summary"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="file">Optional</label>
              <input
                type="file"
                ref={inputRef}
                onChange={handleFileChange}
              />
            </div>
            <div>
              <ReactQuill value={content} onChange={setContent} formats={formats} required />
            </div>
            <div>
              <button type="submit" className="post-btn" disabled={isSubmitting}>
                {isSubmitting ? 'Creating Post...' : 'Create Post'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserCreatePost;
