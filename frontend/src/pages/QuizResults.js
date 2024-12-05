import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getQuizResults } from '../api'; // Assuming you have an API call for this

const QuizResults = () => {
  const { state } = useLocation(); // Fetch score passed via state
  const [quizResult, setQuizResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuizResults = async () => {
      try {
        const response = await getQuizResults(state.responseId); // Assuming responseId is passed in state
        setQuizResult(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching quiz results');
        setLoading(false);
      }
    };

    fetchQuizResults();
  }, [state.responseId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Quiz Results</h2>
      <p>Your score: {quizResult.score}</p>
      <p>Percentage: {quizResult.scorePercentage}%</p>

      <h3>Correct Answers</h3>
      <ul>
        {quizResult.correctResponses.map((response, index) => (
          <li key={index}>
            <strong>{response.questionText}</strong>: {response.selectedOption}
          </li>
        ))}
      </ul>

      <h3>Incorrect Answers</h3>
      <ul>
        {quizResult.incorrectResponses.map((response, index) => (
          <li key={index}>
            <strong>{response.questionText}</strong>: {response.selectedOption}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuizResults;
