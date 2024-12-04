import React from 'react';
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

const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle between open and closed sidebar
  };

  return (
    <Box
      sx={{
        top: 0,
        left: 0,
        height: '100vh',  // Full height of the viewport
        width: isSidebarOpen ? '200px' : '60px',  // Adjust the width based on sidebar state
        background: '#2c3e50',
        color: 'white',
        padding: '20px',
        boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column', // Stack items vertically
        transition: 'width 0.3s ease',
        zIndex: 1000,
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
        <ListItem button component="a" href="/quizzes">
          <HomeIcon sx={{ marginRight: isSidebarOpen ? '10px' : '0px', fontSize: '20px', color: 'white' }} />
          {isSidebarOpen && <ListItemText primary="View Quizzes" sx={{ color: 'white', marginLeft: '10px', fontSize: '14px' }} />}
        </ListItem>

        <ListItem button component="a" href="/create">
          <CreateIcon sx={{ marginRight: isSidebarOpen ? '10px' : '0px', fontSize: '20px', color: 'white' }} />
          {isSidebarOpen && <ListItemText primary="Create Quiz" sx={{ color: 'white', marginLeft: '10px', fontSize: '14px' }} />}
        </ListItem>

        <ListItem button component="a" href="/history">
          <HistoryIcon sx={{ marginRight: isSidebarOpen ? '10px' : '0px', fontSize: '20px', color: 'white' }} />
          {isSidebarOpen && <ListItemText primary="Quiz History" sx={{ color: 'white', marginLeft: '10px', fontSize: '14px' }} />}
        </ListItem>

        <ListItem button component="a" href="/leaderboard">
          <LeaderboardIcon sx={{ marginRight: isSidebarOpen ? '10px' : '0px', fontSize: '20px', color: 'white' }} />
          {isSidebarOpen && <ListItemText primary="Leaderboard" sx={{ color: 'white', marginLeft: '10px', fontSize: '14px' }} />}
        </ListItem>
      </List>

      {/* Spacer for social links */}
      <Box sx={{ marginTop: 'auto', display: isSidebarOpen ? 'flex' : 'none' }}>
        <IconButton href="https://instagram.com" sx={{ color: 'white' }}><InstagramIcon /></IconButton>
        <IconButton href="https://facebook.com" sx={{ color: 'white' }}><FacebookIcon /></IconButton>
        <IconButton href="mailto:example@gmail.com" sx={{ color: 'white' }}><GmailIcon /></IconButton>
        <IconButton href="https://twitter.com" sx={{ color: 'white' }}><TwitterIcon /></IconButton>
        <IconButton href="tel:+1234567890" sx={{ color: 'white' }}><PhoneIcon /></IconButton>
      </Box>
    </Box>
  );
};

export default Navbar;
