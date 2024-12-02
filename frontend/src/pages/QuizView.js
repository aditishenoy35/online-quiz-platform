import React, { useEffect, useState } from 'react';
import QuizFilters from '../component/QuizFilters';  // Assuming QuizFilter is correctly imported
import { fetchAllQuizzes } from '../api';  // Assuming you've already saved the API function in api.js

const QuizView = () => {
  // State for quizzes, difficulty, category, and filtered quizzes
  const [quizzes, setQuizzes] = useState([]);
  const [difficulty, setDifficulty] = useState('');
  const [category, setCategory] = useState('');

  // Fetch and filter quizzes on component mount and when filters change
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

        setQuizzes(filtered);  // Set the filtered quizzes directly
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      }
    };

    fetchAndFilterQuizzes();
  }, [difficulty, category]);  // Re-run when filters change

  return (
    <div className="quiz-view">
      <QuizFilters
        difficulty={difficulty}
        setDifficulty={setDifficulty}
        category={category}
        setCategory={setCategory}
      /> {/* Filters component */}

      <div className="quiz-list">
        {quizzes.length > 0 ? (
          quizzes.map((quiz) => (
            <div key={quiz._id} className="quiz-card">
              <h2>{quiz.title}</h2>
              <p>Category: {quiz.category}</p>
              <p>Difficulty: {quiz.difficulty}</p>
              <p>{quiz.description}</p>
              {/* Add more details or functionality as needed */}
            </div>
          ))
        ) : (
          <p>No quizzes found</p>
        )}
      </div>
    </div>
  );
};

export default QuizView;
