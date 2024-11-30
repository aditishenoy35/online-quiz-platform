import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import './styles/App.css';

const App = () => {
  return (
    <Router>
      <div className="app">
        {/* Header Section */}
        <header className="header">
          <div className="branding">
            <h1>QuizHive</h1>
          </div>
          <nav className="navbar">
            <ul>
              <li><Link to="/" className="navbar-link">Home</Link></li>
              <li><Link to="/login" className="navbar-link">Login</Link></li>
              <li><Link to="/register" className="navbar-link">Register</Link></li>
              <li><a href="#contact" className="navbar-link">Contact</a></li>
            </ul>
          </nav>
        </header>

        {/* Hero Section */}
        <section className="hero">
          <div className="container hero-layout">
            <div className="hero-content">
              <h2>Create Fun & Engaging Quizzes</h2>
              <p>
                Unlock the power of interactive quizzes to engage your audience.
                Create, share, and challenge others in a few clicks!
              </p>
              <Link to="/login" className="hero-button">Start Your Quiz Journey</Link>
            </div>
            <div className="hero-image">
              <img src="/images/quiz.jpg" alt="Quiz Illustration" />
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="about">
          <div className="container about-layout">
            <div className="about-illustration">
              <div className="illustration-wrapper">
                <img src="/images/quiz1.jpg" alt="Quiz Illustration1" />
              </div>
            </div>
            <div className="about-content">
              <h2>How to Create Your Own Quiz</h2>
              <ul>
                <li>
                  <span className="bullet-point"></span> 
                  Designing a quiz is simple! Enter questions, mark answers, and you're good to go.
                </li>
                <li>
                  <span className="bullet-point"></span> 
                  Use your quiz in presentations or let it stand alone.
                </li>
                <li>
                  <span className="bullet-point"></span> 
                  Combine quiz slides with content slides for added context.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Quiz Preview Section */}
        <section className="quiz-preview">
          <div className="container">
            <h2>Quiz Previews</h2>
            <div className="quiz-grid">
              {/* Wrap each quiz card inside a Link */}
              <Link to="/login" className="quiz-card">
                <img src="/images/quiz2.jpg" alt="Quiz 1" />
                <h3>General Knowledge</h3>
              </Link>
              <Link to="/login" className="quiz-card">
                <img src="/images/quiz3.jpg" alt="Quiz 2" />
                <h3>Science & Tech</h3>
              </Link>
              <Link to="/login" className="quiz-card">
                <img src="/images/quiz4.jpg" alt="Quiz 3" />
                <h3>Pop Culture</h3>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="features">
          <div className="container">
            <h2>Why Choose QuizHive?</h2>
            <div className="features-grid">
              <div className="feature">
                <i className="fas fa-brain feature-icon"></i>
                <h3>Interactive Quizzes</h3>
                <p>Boost engagement with dynamic and visually appealing quizzes.</p>
              </div>
              <div className="feature">
                <i className="fas fa-share-alt feature-icon"></i>
                <h3>Easy Sharing</h3>
                <p>Share quizzes with friends and colleagues effortlessly.</p>
              </div>
              <div className="feature">
                <i className="fas fa-chart-line feature-icon"></i>
                <h3>Track Progress</h3>
                <p>Monitor quiz performance and analyze results instantly.</p>
              </div>
              <div className="feature">
                <i className="fas fa-users feature-icon"></i>
                <h3>Community</h3>
                <p>Join a thriving community of quiz lovers worldwide.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer">
          <p>&copy; 2024 QuizHive. All rights reserved.</p>
        </footer>

        {/* Routes */}
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>

        {/* Contact Section */}
        <section id="contact" className="contact">
          <div className="container">
            <h2>Contact Us</h2>
            <p>Feel free to reach out to us:</p>
            <div className="social-links-horizontal">
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i> Instagram</a>
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook"></i> Facebook</a>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i> Twitter</a>
              <a href="mailto:support@quizhive.com"><i className="fas fa-envelope"></i> Gmail</a>
              <a href="tel:+1234567890"><i className="fas fa-phone"></i> Phone</a>
            </div>
          </div>
        </section>
      </div>
    </Router>
  );
};
export default App;
