import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css'; // Assuming you have the required styles
import QuizPreview from '../component/QuizPreview';

const Home = () => {
  return (
    <div className="home">
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

      {/* Other Sections (About, Quiz Preview, Features, etc.) */}
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
        <section className="quiz-preview">
          <QuizPreview />
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
  );
};

export default Home;
