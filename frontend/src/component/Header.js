import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Header.css'; // Add a separate CSS file for the header styles

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add your logout logic here
    console.log('Logout clicked');
    navigate('/login');
  };

  return (
    <div className="header-container">
      <div className="platform-name">QuizHive</div>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Header;
