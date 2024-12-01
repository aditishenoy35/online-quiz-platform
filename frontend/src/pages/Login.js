import React, { useState } from 'react';
import { loginUser } from '../api';
import { Link } from 'react-router-dom';
import '../styles/Login.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import icons for eye toggle

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(formData);
      localStorage.setItem('token', response.data.token);
      setMessage('Login successful!');
    } catch (err) {
      setMessage(err.response?.data?.msg || 'Error occurred');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Welcome Back!</h2>
        <p>Ready to challenge yourself? Login to continue!</p>
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
        <button type="submit">Login</button>
        {message && <p className="message">{message}</p>}
        <p>
          Don't have an account? <Link to="/register">Register here</Link>
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

export default Login;
