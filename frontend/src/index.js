import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';  // Main app component
import './index.css';  // Optional: global CSS styling

const root = ReactDOM.createRoot(document.getElementById('root'));  // Creates a root for the app in 'root' div
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
