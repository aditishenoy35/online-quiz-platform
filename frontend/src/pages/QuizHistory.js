import React, { useEffect, useState } from 'react';
import Navbar from '../component/Navbar';
import { getUserQuizHistory } from '../api';
import '../styles/QuizHistory.css'; // Import the custom CSS for styling

const QuizHistory = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const userId = localStorage.getItem('userId');
  const [quizHistory, setQuizHistory] = useState({
    createdQuizzes: [],
    answeredQuizzes: [],
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (!userId) {
      setError('User ID is missing.');
      return;
    }

    const fetchQuizHistory = async () => {
      try {
        const response = await getUserQuizHistory(userId);
        setQuizHistory({
          createdQuizzes: response.data.createdQuizzes || [],
          answeredQuizzes: response.data.answeredQuizzes || [],
        });
      } catch (err) {
        console.error('Error fetching quiz history:', err);
        setError('Error fetching quiz history. Please try again later.');
      }
    };

    fetchQuizHistory();
  }, [userId]);

  const { createdQuizzes, answeredQuizzes } = quizHistory;

  return (
    <div className="quiz-history-container">
      <Navbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

      <div className="content">
        <h2>Quiz History</h2>
        {error && <p className="error-message">{error}</p>}
{/* Created Quizzes Section */}
<section className="quiz-section">
  <h3>Created Quizzes</h3>
  <div className="card-container">
    {createdQuizzes.length > 0 ? (
      createdQuizzes.map((quiz) => (
        <div className="quiz-card created-quiz" key={quiz._id}>
          <div className="quiz-card-header">
            <h4>{quiz.title}</h4>
          </div>
          <div className="quiz-card-body">
            <p><strong>Category:</strong> {quiz.category}</p>
            <p><strong>Difficulty:</strong> {quiz.difficulty}</p>
            <p>{quiz.description}</p>
          </div>
        </div>
      ))
    ) : (
      <p>No created quizzes found.</p>
    )}
  </div>
</section>


        <hr className="divider" /> {/* Divider between sections */}

        {/* Answered Quizzes Section */}
        <section className="quiz-section">
          <h3>Answered Quizzes</h3>
          <div className="card-container">
            {answeredQuizzes.length > 0 ? (
              answeredQuizzes.map((response) => (
                <div className="quiz-card answered-quiz" key={response._id}>
                  <div className="quiz-card-header">
                    <h4>{response.quiz?.title}</h4>
                  </div>
                  <div className="quiz-card-body">
                    <p>{response.quiz?.description}</p>
                    <p><strong>Category:</strong> {response.quiz?.category}</p>
                    <p><strong>Difficulty:</strong> {response.quiz?.difficulty}</p>
                    <p><strong>Score:</strong> {response.score}</p>
                    <p>
                      <strong>Submitted on:</strong>{' '}
                      {response.submittedAt ? new Date(response.submittedAt).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p>No answered quizzes found.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default QuizHistory;
