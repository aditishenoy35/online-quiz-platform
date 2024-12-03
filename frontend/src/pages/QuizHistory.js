import React from 'react';
import Navbar from '../component/Navbar';

const QuizHistory = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Navbar /> {/* Navbar stays fixed on the left */}

      <div style={{ padding: '20px', flex: 1 }}>
        <h2>Quiz History</h2>
        <p>View your quiz history here. (Functionality to be added later.)</p>
      </div>
    </div>
  );
};

export default QuizHistory;
