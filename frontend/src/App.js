import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'; // The new landing page component
import Register from './pages/Register';
import Login from './pages/Login';
import QuizView from './pages/QuizView';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Landing Page Route */}
        <Route path="/" element={<Home />} />

        {/* Auth Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Public Route for QuizView */}
        <Route path="/quizzes" element={<QuizView />} /> {/* No authentication check */}
      </Routes>
    </Router>
  );
};

export default App;
