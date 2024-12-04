import React, { useState, useEffect } from 'react';

const QuestionTimer = ({ onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    if (timeLeft === 0) {
      onTimeUp(); // Callback when time is up
      return;
    }
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer); // Cleanup interval on unmount
  }, [timeLeft, onTimeUp]);

  return <div>Time Left: {timeLeft}s</div>;
};

export default QuestionTimer;
