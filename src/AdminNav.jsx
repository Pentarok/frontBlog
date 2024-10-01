import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const pages = [];

const settings = [
  { name: 'Logout', path: '/login' },
  { name: 'Profile', path: '/admin/profile' },
];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [userPhotoURL, setUserPhotoURL] = useState('');
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();
  const [session, setSession] = useState(false);

  useEffect(() => {
    axios.get(`${serverUri}/admin/status`, { withCredentials: true })
      .then(res => {
        if (res.data === 'Ok') {
          setSession(true);
        } else {
          navigate('/login');
        }
      });
  }, [navigate]);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('userId');

    // Show toast notification for logout success
    toast.success('Logout successful! Redirecting...', {
      position: 'top-right',
      autoClose: 2000,
    });

    // Delay redirect by 2 seconds
    setTimeout(() => {
      navigate('/login');
    }, 2500);
  };

  return (
    <>
      <AppBar position="static">
        <Box sx={{ flexGrow: 1 }}>
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                backgroundColor: 'black',
                textDecoration: 'none',
              }}
            >
              {/* Add admin logo or name here */}
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="open navigation menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
              >
                {pages.map((page) => (
                  <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                    <Link to={page.path} style={{ textDecoration: 'none', color: 'inherit' }}>
                      {page.name}
                    </Link>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Link
                  key={page.name}
                  to={page.path}
                  style={{ textDecoration: 'none', color: 'white', padding: '0 10px' }}
                >
                  {page.name}
                </Link>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Admin Avatar" src={userPhotoURL} />
                </IconButton>
              </Tooltip>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) =>
                  setting.name === 'Logout' && session ? (
                    <MenuItem key={setting.name} onClick={handleLogout}>
                      <Typography textAlign="center">{setting.name}</Typography>
                    </MenuItem>
                  ) : (
                    setting.name !== 'Logout' && (
                      <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
                        <Link to={setting.path} style={{ textDecoration: 'none', color: 'inherit' }}>
                          <Typography textAlign="center">{setting.name}</Typography>
                        </Link>
                      </MenuItem>
                    )
                  )
                )}
              </Menu>
            </Box>
          </Toolbar>
        </Box>
      </AppBar>

      {/* ToastContainer must be rendered to display the toast notifications */}
      <ToastContainer />
    </>
  );
}

export default ResponsiveAppBar;
