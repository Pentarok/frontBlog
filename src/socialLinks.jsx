import React, { useState } from 'react';
import axios from 'axios';
import './sociallinks.css';

const SocialLinksForm = ({ postId }) => {
  const [socialLinks, setSocialLinks] = useState([{ platform: '', link: '' }]);

  // Function to handle input change for each platform-link pair
  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const newSocialLinks = [...socialLinks];
    newSocialLinks[index][name] = value;
    setSocialLinks(newSocialLinks);
  };

  // Function to handle adding a new platform-link pair
  const handleAddLink = () => {
    setSocialLinks([...socialLinks, { platform: '', link: '' }]);
  };

  // Function to remove a platform-link pair
  const handleRemoveLink = (index) => {
    const newSocialLinks = [...socialLinks];
    newSocialLinks.splice(index, 1);
    setSocialLinks(newSocialLinks);
  };

// Frontend: Function to handle form submission for creating new social links
const handleSubmit = async (e) => {
  e.preventDefault();
  
  try {
    const response = await axios.post(
      `http://localhost:3002/user/social-links/${postId}`,  // Posting instead of updating
      { socialLinks },  // Send the array of platform-link pairs
      { withCredentials: true }
    );

    console.log(response.data);
    alert('Social links posted successfully!');
  } catch (error) {
    console.error('Error posting social links:', error);
  }
};

  return (
    <div style={{ border: '1px solid green', borderRadius: '5px', padding: '8px' }}>
      <form onSubmit={handleSubmit}>
        <h5>Add Social Media Links</h5>
        {socialLinks.map((socialLink, index) => (
          <div key={index} className="social-container">
            <input
              type="text"
              placeholder="Platform e.g Facebook"
              name="platform"
              value={socialLink.platform}
              onChange={(e) => handleInputChange(index, e)}
            />
            <input
              type="text"
              placeholder="Link"
              name="link"
              value={socialLink.link}
              onChange={(e) => handleInputChange(index, e)}
            />
            <button type="button" style={{position:'relative',bottom:'3px'}} onClick={() => handleRemoveLink(index)} className="btn btn-danger">
              Remove
            </button>
          </div>
        ))}
        <button type="button"  onClick={handleAddLink} className="btn btn-secondary">
          Add Another Link
        </button>
        <button type="submit" style={{marginLeft:'5px'}} className="btn btn-primary">
          Submit Links
        </button>
      </form>
    </div>
  );
};

export default SocialLinksForm;
