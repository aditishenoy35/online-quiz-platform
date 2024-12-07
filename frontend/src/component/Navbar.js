import React, { useState, useEffect} from 'react';
import { Box, List, ListItem, ListItemText, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Avatar, Typography } from '@mui/material';
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
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { getUser } from '../api';
const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const [userName, setUserName] = useState('');  // State to handle logout confirmation popup
  useEffect(() => {
    // Fetch user details from the backend
    const fetchUserName = async () => {
      try {
        const userId = localStorage.getItem('userId'); // Get userId from local storage
        if (!userId) {
          setUserName('Guest'); // Default to Guest if no userId is found
          return;
        }

        // Call backend to get user details
        const response = await getUser(userId);
        const { name } = response.data;
        setUserName(name); // Update the state with the user's name
      } catch (error) {
        console.error('Error fetching user details:', error);
        setUserName('Guest'); // Default to Guest in case of an error
      }
    };

    fetchUserName();
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle between open and closed sidebar
  };

  const handleLogoutClick = () => {
    setIsLogoutDialogOpen(true); // Open the confirmation dialog
  };

  const handleLogoutConfirm = () => {
    // Logic for logging out (e.g., clearing session, token)
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    console.log('Logging out...');
    setIsLogoutDialogOpen(false); // Close the confirmation dialog
    // Redirect to login page or perform logout actions here
    window.location.href = '/login';
  };

  const handleLogoutCancel = () => {
    setIsLogoutDialogOpen(false); // Close the confirmation dialog
  };

  return (
    <Box
      sx={{
        top: 0,
        left: 0,
        height: '100vh', // Full height of the viewport
        width: isSidebarOpen ? '200px' : '60px', // Adjust the width based on sidebar state
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
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '20px',
        }}
      >
        <Avatar sx={{ bgcolor: '#3498db', marginRight: isSidebarOpen ? '10px' : '0' }}>
          {userName.charAt(0).toUpperCase()} {/* Display the first letter of the user's name */}
        </Avatar>
        {isSidebarOpen && (
          <Typography sx={{ color: 'white', fontSize: '14px' }}>{userName}</Typography>
        )}
      </Box>
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

        {/* Logout Button */}
        <ListItem button onClick={handleLogoutClick}>
          <ExitToAppIcon sx={{ marginRight: isSidebarOpen ? '10px' : '0px', fontSize: '20px', color: 'white' }} />
          {isSidebarOpen && <ListItemText primary="Logout" sx={{ color: 'white', marginLeft: '10px', fontSize: '14px' }} />}
        </ListItem>
      </List>

      {/* Spacer for social links */}
      <Box sx={{ marginTop: '100px', display: isSidebarOpen ? 'flex' : 'none' }}>
         <IconButton href="https://instagram.com" sx={{ color: 'white' }}><InstagramIcon /></IconButton>
         <IconButton href="https://facebook.com" sx={{ color: 'white' }}><FacebookIcon /></IconButton>
         <IconButton href="mailto:example@gmail.com" sx={{ color: 'white' }}><GmailIcon /></IconButton>
         <IconButton href="https://twitter.com" sx={{ color: 'white' }}><TwitterIcon /></IconButton>
         <IconButton href="tel:+1234567890" sx={{ color: 'white' }}><PhoneIcon /></IconButton>
      </Box>


      {/* Logout Confirmation Dialog */}
      <Dialog open={isLogoutDialogOpen} onClose={handleLogoutCancel}>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to log out?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogoutCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleLogoutConfirm} color="secondary">
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Navbar;
