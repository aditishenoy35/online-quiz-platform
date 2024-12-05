import React, { useEffect, useState } from 'react';
import Navbar from '../component/Navbar';
import { getCreatedQuizzesHistory, getAnsweredQuizzesHistory } from '../api';

const QuizHistory = () => {
  const userId = localStorage.getItem('userId'); // User ID from local storage
  const [createdQuizzes, setCreatedQuizzes] = useState([]);
  const [answeredQuizzes, setAnsweredQuizzes] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    console.log('Fetched userId:', userId); // Log the fetched userId
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
        console.log('Created quizzes:', created.data); // Log created quizzes
        console.log('Answered quizzes:', answered.data); // Log answered quizzes

        setCreatedQuizzes(created.data);
        setAnsweredQuizzes(answered.data);
      } catch (err) {
        console.error('Error fetching quiz histories:', err); // Log any errors
        setError('Error fetching quiz histories.');
      }
    };

    fetchHistories();
  }, [userId]);

  useEffect(() => {
    console.log('Updated created quizzes:', createdQuizzes); // Log updates to createdQuizzes
  }, [createdQuizzes]);

  useEffect(() => {
    console.log('Updated answered quizzes:', answeredQuizzes); // Log updates to answeredQuizzes
  }, [answeredQuizzes]);

  return (
    <div style={{ display: 'flex' }}>
      <Navbar />
      <div style={{ padding: '20px', flex: 1 }}>
        <h2>Quiz History</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <h3>Created Quizzes</h3>
        {console.log('Rendering created quizzes:', createdQuizzes)} {/* Log while rendering */}
        <ul>
          {createdQuizzes.length > 0 ? (
            createdQuizzes.map((response) => (
              <li key={response._id}>
                <h4>{response.quiz.title}</h4>
                <p>{response.quiz.description}</p>
                <p>Category: {response.quiz.category}</p>
                <p>Difficulty: {response.quiz.difficulty}</p>
                <p>Score: {response.score}</p>
                <p>Submitted on: {new Date(response.submittedAt).toLocaleDateString()}</p>
              </li>
            ))    
          ) : (
            <p>No created quizzes found.</p>
          )}
        </ul>

        <h3>Answered Quizzes</h3>
        {console.log('Rendering answered quizzes:', answeredQuizzes)} {/* Log while rendering */}
        <ul>
          {answeredQuizzes.length > 0 ? (
           answeredQuizzes.map((response) => (
            <li key={response._id}>
              <h4>{response.quiz.title}</h4>
              <p>{response.quiz.description}</p>
              <p>Category: {response.quiz.category}</p>
              <p>Difficulty: {response.quiz.difficulty}</p>
              <p>Score: {response.score}</p>
              <p>Submitted on: {new Date(response.submittedAt).toLocaleDateString()}</p>
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
