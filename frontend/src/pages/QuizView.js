import React, { useEffect, useState } from 'react';
import QuizFilters from '../component/QuizFilters';  // Assuming QuizFilter is correctly imported
import { fetchAllQuizzes } from '../api';  // Assuming you've already saved the API function in api.js
import Navbar from '../component/Navbar'; // Import the Navbar component
import '../styles/Dashboard.css';
import { useNavigate } from 'react-router-dom';

const QuizView = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [difficulty, setDifficulty] = useState('');
  const [category, setCategory] = useState('');
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

  const handleStartClick = (quizId) => {
    navigate(`#`);
  };

  return (
    <div style={{ display: 'flex' }}>
      {/* Sidebar (Navbar) */}
      <Navbar />

      {/* Content Area */}
      <div style={{ flex: 1, padding: '20px', backgroundColor: '#f4f4f9' }}>
        {/* Filters component */}
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
                  onClick={() => handleStartClick(quiz._id)}  // Start button click
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
  );
};

export default QuizView;
