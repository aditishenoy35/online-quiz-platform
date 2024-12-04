import React, { useState } from 'react';
import Navbar from '../component/Navbar';

const Leaderboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div style={{ display: 'flex', height: '100vh', margin: 0 }}>
      <Navbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      <div style={{
          flex: 1,
          backgroundColor: '#f4f4f9',
          marginLeft: isSidebarOpen ? '0px' : '0px', // Adjust margin based on sidebar state
          paddingTop: '0', // Ensure no padding at the top
          overflowY: 'auto', // Allow scrolling
          transition: 'margin-left 0.3s ease', // Smooth transition for margin
        }}>
        <h2>Leaderboard</h2>
        <p>See the leaderboard for the quizzes. (Functionality to be added later.)</p>
      </div>
    </div>
  );
};

export default Leaderboard;
