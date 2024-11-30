import '../styles/Home.css';
import React, { useEffect, useState } from 'react';
import { fetchDefaultQuizzes } from '../api'; // Import the function to fetch quizzes

const QuizPreview = () => {
  const [quizzes, setQuizzes] = useState([]); // State to store the quizzes
  const [loading, setLoading] = useState(true); // Loading state for UI
  const [error, setError] = useState(null); // State to store error if fetching fails

  // Fetch quizzes from the backend
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await fetchDefaultQuizzes(); // Use the API function
        setQuizzes(response.data); // Store quizzes in state
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error('Error fetching quizzes:', error);
        setError('Failed to load quizzes');
        setLoading(false); // Set loading to false in case of an error
      }
    };

    fetchQuizzes();
  }, []);

  if (loading) {
    return <p>Loading quizzes...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section className="quiz-preview">
      <div className="container">
        <h2>Quiz Previews</h2>
        <div className="quiz-grid">
          {quizzes.map((quiz) => (
            <div key={quiz._id} className="quiz-card">
              {/* Placeholder icon or image */}
              <div className="quiz-placeholder">
                <i className="fas fa-question-circle"></i> {/* Example icon */}
              </div>
              <h3>{quiz.title}</h3>
              <p>{quiz.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuizPreview;
