import React, { useState, useEffect } from 'react';
import '../styles/Start.css'; // Import CSS for styling

const QuestionTimer = ({ onTimeUp, resetKey }) => {
  const [timeLeft, setTimeLeft] = useState(30);

  // Reset timer whenever resetKey changes
  useEffect(() => {
    setTimeLeft(30); // Reset the timer to 30 seconds
  }, [resetKey]);

  // Countdown logic
  useEffect(() => {
    if (timeLeft === 0) {
      onTimeUp(); // Trigger callback when time is up
      return;
    }
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer); // Cleanup interval on unmount
  }, [timeLeft, onTimeUp]);

  return <div className="timer">Time Left: {timeLeft}s</div>;
};

export default QuestionTimer;
