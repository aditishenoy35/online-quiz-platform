import React from 'react';
import '../styles/Dashboard.css';

const ConfirmationDialog = ({ title, message, onConfirm, onCancel }) => {
  return (
    <div className="quiz-details-overlay">
      <div className="quiz-details-modal">
        <h2>{title}</h2>
        <p>{message}</p>
        <div className="quiz-details-actions">
          <button className="btn-cancel" onClick={onCancel}>
            No
          </button>
          <button className="btn-proceed" onClick={onConfirm}>
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
