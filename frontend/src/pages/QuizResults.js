import React from 'react';
import { useLocation } from 'react-router-dom';

const QuizResults = () => {
  const { state } = useLocation(); // Fetch score passed via state

  return (
    <div>
      <h2>Quiz Results</h2>
      <p>Your score: {state.score}</p>
    </div>
  );
};

export default QuizResults;
