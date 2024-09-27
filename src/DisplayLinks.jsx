import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './displaylink.css'; // Import the updated CSS
import { Box, Typography, IconButton, Tooltip } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareTwitter } from '@fortawesome/free-brands-svg-icons';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

const UserProfile = ({ postLinks, showDelete }) => {
    const [socialLinks, setSocialLinks] = useState({});

    useEffect(() => {
        const fetchSocialLinks = async () => {
            try {
                const response = await axios.get('http://localhost:3002/user/social-links', { withCredentials: true });
                setSocialLinks(response.data.socialLinks);
            } catch (error) {
                console.error('Error fetching social links:', error);
            }
        };

        fetchSocialLinks();
    }, []);

    const handleDelete = async (platform, link) => {
        try {
            await axios.post('http://localhost:3002/user/delete-social-link', { platform, link }, { withCredentials: true });
            toast.success('Link deleted successfully!', { autoClose: 3000 });
            // Handle state update or refetch
        } catch (error) {
            toast.error('Error deleting link!', { autoClose: 3000 });
        }
    };

    const handleNavigate = (link) => {
        window.open(link, '_blank');
    };

    const renderLink = (platform, link) => {
        const iconProps = {
            href: link,
            target: "_blank",
            rel: "noopener noreferrer",
            sx: { color: 'white' },
            className: "icon-item",
        };

        return (
            <div className="social-link-item" key={platform}>
                {platform === 'facebook' && (
                    <Tooltip title="Facebook">
                        <IconButton {...iconProps}>
                            <FacebookIcon />
                        </IconButton>
                    </Tooltip>
                )}
                {platform === 'whatsapp' && (
                    <Tooltip title="WhatsApp">
                        <IconButton {...iconProps}>
                            <WhatsAppIcon />
                        </IconButton>
                    </Tooltip>
                )}
                {platform === 'twitter' && (
                    <Tooltip title="Twitter">
                        <IconButton {...iconProps}>
                            <FontAwesomeIcon icon={faSquareTwitter} />
                        </IconButton>
                    </Tooltip>
                )}
                {platform === 'email' && (
                    <Tooltip title="Email">
                        <IconButton
                            href={`mailto:${link}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{ color: 'white' }}
                            className="icon-item"
                        >
                            <EmailIcon />
                        </IconButton>
                    </Tooltip>
                )}
                {!['facebook', 'whatsapp', 'twitter', 'email'].includes(platform) && (
                    <Typography
                        component="a"
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ color: 'white' }}
                        className="icon-item"
                    >
                        {platform}
                    </Typography>
                )}
                {showDelete && (
                    <div className="hover-options">
                        <button
                            className="option-button"
                            onClick={() => handleDelete(platform, link)}
                        >
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                        <button
                            className="option-button"
                            onClick={() => handleNavigate(link)}
                        >
                            <FontAwesomeIcon icon={faPenToSquare} />
                        </button>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div>
            <Box sx={{ margin: '0.5rem 0' }} className="icon-container">
                {postLinks && postLinks.map((linkObject, index) => (
                    linkObject.link && renderLink(linkObject.platform, linkObject.link))
                )}
            </Box>
        </div>
    );
};

export default UserProfile;
