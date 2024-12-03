import React from 'react';
import Navbar from './Navbar'; // Assuming you have a sidebar/navbar component
import { Box } from '@mui/material';

const DashboardLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Navbar/Sidebar */}
      <Navbar />

      {/* Content area */}
      <Box
        sx={{
          flex: 1,
          background: '#f4f4f9',
          padding: '20px',
          overflowY: 'auto',
        }}
      >
        {/* Render the children passed to the layout */}
        {children}
      </Box>
    </Box>
  );
};

export default DashboardLayout;
