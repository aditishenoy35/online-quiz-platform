import React, { useState } from 'react';
import { registerUser } from '../api';
import { Link } from 'react-router-dom';
import '../styles/Register.css';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser(formData);
      setMessage('Registration successful!');
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
    <input
      type="password"
      name="password"
      placeholder="Password"
      onChange={handleChange}
      required
    />
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
