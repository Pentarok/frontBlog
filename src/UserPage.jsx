import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, TextField, Typography, Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';

const Profile = () => {
  const serverUri = import.meta.env.VITE_SERVER;


  const [user, setUser] = useState({
    username: '',
    email: '',
  });
  const [newUsername, setNewUsername] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('info');

  useEffect(() => {
    const fetchUserDetails = async () => {

      try {
        const response = await axios.get(`${serverUri}/api/user/profile`); // Adjust the API endpoint as needed
        setUser(response.data);
        setNewUsername(response.data.username);
        setNewEmail(response.data.email);
      }
       catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, []);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const response = await axios.put(`${serverUri}/api/user/profile`, {
        username: newUsername,
        email: newEmail,
      }); // Adjust the API endpoint as needed
      setUser({ username: newUsername, email: newEmail });
      setMessage('Profile updated successfully!');
      setSeverity('success');
    } catch (error) {
      setMessage('Failed to update profile.');
      setSeverity('error');
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      setLoading(true);
      try {
        await axios.delete(`${serverUri}/api/user/profile`,{withCredentials:true}); // Adjust the API endpoint as needed
        setMessage('Account deleted successfully!');
        setSeverity('success');
        // Redirect or handle post-deletion logic here
      } catch (error) {
        setMessage('Failed to delete account.');
        setSeverity('error');
        console.error('Error deleting account:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Box sx={{ padding: '2rem' }}>
      <Typography variant="h4">Profile</Typography>
      <Box sx={{ marginTop: '2rem' }}>
        <TextField
          label="Username"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          type="email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpdate}
          disabled={loading}
          sx={{ marginTop: '1rem' }}
        >
          {loading ? 'Updating...' : 'Update Profile'}
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleDelete}
          disabled={loading}
          sx={{ marginTop: '1rem', marginLeft: '1rem' }}
        >
          {loading ? 'Deleting...' : 'Delete Account'}
        </Button>
      </Box>
      <Snackbar open={!!message} autoHideDuration={6000} onClose={() => setMessage('')}>
        <Alert onClose={() => setMessage('')} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Profile;
