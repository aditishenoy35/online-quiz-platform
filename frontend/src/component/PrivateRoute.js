import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    // If the token is not available, redirect to login page
    return <Navigate to="/login" />;
  }

  return children;  // If the user is logged in, render the children (protected pages)
};

export default PrivateRoute;
