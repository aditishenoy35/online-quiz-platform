import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, List, ListItem, ListItemText, IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import CreateIcon from '@mui/icons-material/Create';
import HistoryIcon from '@mui/icons-material/History';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import GmailIcon from '@mui/icons-material/Email';
import TwitterIcon from '@mui/icons-material/Twitter';
import PhoneIcon from '@mui/icons-material/Phone';

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar starts as collapsed (false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle between open and closed sidebar
  };

  return (
    <Box
      sx={{
        width: isSidebarOpen ? '200px' : '60px', // Adjust width based on sidebar state
        height: '100vh',
        background: '#2c3e50',
        color: 'white',
        padding: '20px',
        boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column', // Column layout for stacking items
        transition: 'width 0.3s ease', // Smooth transition for opening/closing
      }}
    >
      {/* Menu Icon for Mobile */}
      <IconButton onClick={toggleSidebar} sx={{ color: 'white', marginBottom: '20px' }}>
        {isSidebarOpen ? <ChevronLeftIcon /> : <MenuIcon />} {/* Change icon based on sidebar state */}
      </IconButton>

      {/* Sidebar Content */}
      <h2 style={{ display: isSidebarOpen ? 'block' : 'none', color: 'white', fontSize: '16px' }}>
        Dashboard
      </h2>
      
      <List>
        <ListItem button component={Link} to="/quizzes" sx={{ display: 'flex', alignItems: 'center' }}>
          <HomeIcon sx={{ marginRight: isSidebarOpen ? '10px' : '0px', fontSize: '20px', color: 'white' }} />
          {isSidebarOpen && <ListItemText primary="View Quizzes" sx={{ color: 'white', marginLeft: '10px', fontSize: '14px' }} />}
        </ListItem>

        <ListItem button component={Link} to="/create" sx={{ display: 'flex', alignItems: 'center' }}>
          <CreateIcon sx={{ marginRight: isSidebarOpen ? '10px' : '0px', fontSize: '20px', color: 'white' }} />
          {isSidebarOpen && <ListItemText primary="Create Quiz" sx={{ color: 'white', marginLeft: '10px', fontSize: '14px' }} />}
        </ListItem>

        <ListItem button component={Link} to="/history" sx={{ display: 'flex', alignItems: 'center' }}>
          <HistoryIcon sx={{ marginRight: isSidebarOpen ? '10px' : '0px', fontSize: '20px', color: 'white' }} />
          {isSidebarOpen && <ListItemText primary="Quiz History" sx={{ color: 'white', marginLeft: '10px', fontSize: '14px' }} />}
        </ListItem>

        <ListItem button component={Link} to="/leaderboard" sx={{ display: 'flex', alignItems: 'center' }}>
          <LeaderboardIcon sx={{ marginRight: isSidebarOpen ? '10px' : '0px', fontSize: '20px', color: 'white' }} />
          {isSidebarOpen && <ListItemText primary="Leaderboard" sx={{ color: 'white', marginLeft: '10px', fontSize: '14px' }} />}
        </ListItem>
      </List>

      {/* Spacer between Page Icons and Contact Icons */}
      <Box sx={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', paddingTop: '20px' }}>
        {/* Row of contact icons at the bottom */}
        <IconButton component="a" href="https://instagram.com" target="_blank" sx={{ color: 'white', fontSize: '18px' }}>
          <InstagramIcon />
        </IconButton>
        <IconButton component="a" href="https://facebook.com" target="_blank" sx={{ color: 'white', fontSize: '18px' }}>
          <FacebookIcon />
        </IconButton>
        <IconButton component="a" href="mailto:example@gmail.com" target="_blank" sx={{ color: 'white', fontSize: '18px' }}>
          <GmailIcon />
        </IconButton>
        <IconButton component="a" href="https://twitter.com" target="_blank" sx={{ color: 'white', fontSize: '18px' }}>
          <TwitterIcon />
        </IconButton>
        <IconButton component="a" href="tel:+1234567890" sx={{ color: 'white', fontSize: '18px' }}>
          <PhoneIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Navbar;
