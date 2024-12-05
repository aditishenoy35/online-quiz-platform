import React, { useEffect, useState } from 'react';
import Navbar from '../component/Navbar';
import { getCreatedQuizzesHistory, getAnsweredQuizzesHistory } from '../api';

const QuizHistory = () => {
  const userId = localStorage.getItem('userId'); // User ID from local storage
  const [createdQuizzes, setCreatedQuizzes] = useState([]); 
  const [answeredQuizzes, setAnsweredQuizzes] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!userId) {
      setError('User ID is missing.');
      return;
    }

    const fetchHistories = async () => {
      try {
        console.log('Fetching quiz histories...');
        const [created, answered] = await Promise.all([
          getCreatedQuizzesHistory(userId),
          getAnsweredQuizzesHistory(userId),
        ]);
        console.log('Fetched Created Quizzes:', created.data);
        console.log('Fetched Answered Quizzes:', answered.data);

        setCreatedQuizzes(created.data || []); // Handle cases where data might be undefined
        setAnsweredQuizzes(answered.data || []);
      } catch (err) {
        console.error('Error fetching quiz histories:', err);
        setError('Error fetching quiz histories. Please try again later.');
      }
    };

    fetchHistories();
  }, [userId]);

  // Optional: Log updated states
  useEffect(() => {
    console.log('Updated Created Quizzes:', createdQuizzes);
  }, [createdQuizzes]);

  useEffect(() => {
    console.log('Updated Answered Quizzes:', answeredQuizzes);
  }, [answeredQuizzes]);

  return (
    <div style={{ display: 'flex' }}>
      <Navbar />
      <div style={{ padding: '20px', flex: 1 }}>
        <h2>Quiz History</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <h3>Created Quizzes</h3>
        <ul>
          {createdQuizzes.length > 0 ? (
            createdQuizzes.map((quiz) => (
              <li key={quiz._id}>
                <h4>{quiz.title}</h4>
                <p>{quiz.description}</p>
                <p>Category: {quiz.category}</p>
                <p>Difficulty: {quiz.difficulty}</p>
                <p>Score: {quiz.score}</p>
                <p>Submitted on: {new Date(quiz.submittedAt).toLocaleDateString()}</p>
              </li>
            ))
          ) : (
            <p>No created quizzes found.</p>
          )}
        </ul>

        <h3>Answered Quizzes</h3>
        <ul>
          {answeredQuizzes.length > 0 ? (
            answeredQuizzes.map((quiz) => (
              <li key={quiz._id}>
                <h4>{quiz.title}</h4>
                <p>{quiz.description}</p>
                <p>Category: {quiz.category}</p>
                <p>Difficulty: {quiz.difficulty}</p>
                <p>Score: {quiz.score}</p>
                <p>Submitted on: {new Date(quiz.submittedAt).toLocaleDateString()}</p>
              </li>
            ))
          ) : (
            <p>No answered quizzes found.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default QuizHistory;
