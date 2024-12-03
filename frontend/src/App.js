import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import QuizView from './pages/QuizView';
import CreateQuiz from './pages/CreateQuiz';
import QuizHistory from './pages/QuizHistory';
import Leaderboard from './pages/Leaderboard';
import PrivateRoute from './component/PrivateRoute'; // For protected routes


const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes - these are only accessible if the user is logged in */}
        <Route path="/quizzes" element={<PrivateRoute><QuizView /></PrivateRoute>} />
        <Route path="/create" element={<PrivateRoute><CreateQuiz /></PrivateRoute>} />
        <Route path="/history" element={<PrivateRoute><QuizHistory /></PrivateRoute>} />
        <Route path="/leaderboard" element={<PrivateRoute><Leaderboard /></PrivateRoute>} />



        {/* Catch-all route */}
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
