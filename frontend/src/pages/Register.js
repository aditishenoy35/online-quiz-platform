import React, { useState } from 'react';
import { registerUser } from '../api';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Register.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import icons for eye toggle

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      setMessage('Registration successful!');
      setTimeout(() => navigate('/login'), 2000); // Redirect after 2 seconds
    } catch (err) {
      setMessage(err.response?.data?.msg || 'Error occurred');
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Start Your Journey</h2>
        <p>Sign up now and explore the world of quizzes!</p>
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <div className="password-input">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <span
            className="password-toggle-icon"
            onClick={() => setShowPassword((prev) => !prev)}
          >
             {showPassword ?  <FaEye />: <FaEyeSlash />}
          </span>
        </div>
        <button type="submit">Register</button>
        {message && <p className="message">{message}</p>}
        <p>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
        <Link to="/" className="back-home">
          <button type="button">Back to Homepage</button>
        </Link>
      </form>
      <footer>
        <p>© 2024 QuizHive. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Register;
