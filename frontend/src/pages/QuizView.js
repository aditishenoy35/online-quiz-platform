import React, { useEffect, useState } from 'react';
import QuizFilters from '../component/QuizFilters';
import { fetchAllQuizzes } from '../api';
import Navbar from '../component/Navbar';
import Header from '../component/Header'; // Import the Header component
import '../styles/Dashboard.css';
import QuizDetails from '../component/QuizDetails';
import { useNavigate } from 'react-router-dom';

const QuizView = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [difficulty, setDifficulty] = useState('');
  const [category, setCategory] = useState('');
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Track sidebar open state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAndFilterQuizzes = async () => {
      try {
        const response = await fetchAllQuizzes();
        let filtered = response.data;

        // Filter based on difficulty and category
        if (difficulty) {
          filtered = filtered.filter((quiz) => quiz.difficulty === difficulty);
        }

        if (category) {
          filtered = filtered.filter((quiz) => quiz.category === category);
        }

        setQuizzes(filtered);
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      }
    };

    fetchAndFilterQuizzes();
  }, [difficulty, category]);

  const handleStartClick = (quiz) => {
    setSelectedQuiz(quiz); // Set the selected quiz
  };

  const handleProceed = (timePerQuestion) => {
    navigate(`/quiz/${selectedQuiz._id}`, { state: { timePerQuestion } }); // Pass time to the quiz page
  };

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', margin: 0 }}>
      {/* Sidebar (Navbar) */}
      <Navbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

      {/* Content Area */}
      <div
        style={{
          flex: 1,
          backgroundColor: '#f4f4f9',
          paddingTop: '0', // Ensure no padding at the top
          overflowY: 'auto', // Allow scrolling
          overflowX: 'hidden', // Prevent horizontal scrolling
        }}
      >
        {/* Header Component */}
        <Header />

        {/* Filters Component */}
        <div style={{ padding: '20px' }}>
          <QuizFilters
            difficulty={difficulty}
            setDifficulty={setDifficulty}
            category={category}
            setCategory={setCategory}
          />

          <div className="quiz-list">
            {quizzes.length > 0 ? (
              quizzes.map((quiz) => (
                <div key={quiz._id} className="quiz-card">
                  <h2 className="header">{quiz.title}</h2>
                  <p>Category: {quiz.category}</p>
                  <p>Difficulty: {quiz.difficulty}</p>
                  <p>{quiz.description}</p>
                  <button
                    onClick={() => handleStartClick(quiz)} // Open QuizDetails modal
                    className="btn-start-quiz"
                  >
                    Start Quiz
                  </button>
                </div>
              ))
            ) : (
              <p>No quizzes found</p>
            )}
          </div>
        </div>
      </div>
        {selectedQuiz && (
          <QuizDetails
            quiz={selectedQuiz}
            onClose={() => setSelectedQuiz(null)} // Close modal
            onProceed={handleProceed} // Navigate to quiz page with time
          />
        )}
    </div>
  );
};

export default QuizView;
