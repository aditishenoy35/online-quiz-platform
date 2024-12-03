import React from 'react';
import Navbar from '../component/Navbar';

const Leaderboard = () => {

  return (
    <div style={{ display: 'flex' }}>
        <Navbar />
      <div style={{ padding: '20px', flex: 1 }}>
        <h2>Leaderboard</h2>
        <p>See the leaderboard for the quizzes. (Functionality to be added later.)</p>
      </div>
    </div>
  );
};

export default Leaderboard;
