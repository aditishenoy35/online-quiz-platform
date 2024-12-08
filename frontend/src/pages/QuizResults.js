import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getQuizResults } from '../api'; // Assuming you have an API call for this
import '../styles/QuizResults.css'; // Import the CSS file for styling

const QuizResults = () => {
  const { state } = useLocation(); // Fetch score passed via state
  const navigate = useNavigate(); // Initialize navigation
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

  const handleGoToQuizzes = () => {
    navigate('/quizzes'); // Navigate to quizzes page
  };

  const handleViewQuizHistory = () => {
    navigate('/history'); // Navigate to quiz history page
  };

  if (loading) {
    return <div className="quiz-loading">Loading...</div>;
  }

  if (error) {
    return <div className="quiz-error">{error}</div>;
  }

  // Calculate Total Score
  const numberOfQuestions = quizResult.totalQuestions;
  const totalScore = numberOfQuestions * 10;

  return (
    <div className="quiz-results-container">
      <div className="quiz-results">
        <h2>QUIZ RESULTS</h2>
        <p className="thank-you">Thank you for attempting this quiz!</p>

        <table className="results-table">
          <tbody>
            <tr>
              <td className="label">Score Obtained:</td>
              <td className="value">{quizResult.score} / {totalScore}</td>
            </tr>
            <tr>
              <td className="label">Percentage:</td>
              <td className="value">{quizResult.scorePercentage}%</td>
            </tr>
          </tbody>
        </table>

        <div className="summary">
          <h3>Performance Summary</h3>
          <p>
            Correct Answers: <span>{quizResult.correctResponses.length}</span>
          </p>
          <p>
            Incorrect Answers: <span className="incorrect">{quizResult.incorrectResponses.length}</span>
          </p>
          <p>Questions Skipped: {quizResult.skippedQuestions.length}</p>
        </div>

        <div className="actions">
          <button onClick={handleGoToQuizzes}>Go to Quizzes</button>
          <button onClick={handleViewQuizHistory}>View Quiz History</button>
        </div>
      </div>
    </div>
  );
};

export default QuizResults;
