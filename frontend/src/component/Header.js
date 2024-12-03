import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <div className="logo">
          <img src="logo.png" alt="Logo" />
        </div>

        {/* Title */}
        <h1 className="title">Quiz App</h1>

        {/* Navigation */}
        <nav className="nav-links">
          <a href="#home" className="nav-link">Home</a>
          <a href="#quizzes" className="nav-link">Quizzes</a>
          <a href="#about" className="nav-link">About</a>
          <a href="#contact" className="nav-link">Contact</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
