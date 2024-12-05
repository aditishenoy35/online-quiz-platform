import React from 'react';
import '../styles/Start.css'; // Import CSS for styling

const Question = ({ question, handleOptionChange }) => {
  return (
    <div className="question">
      <h3 className="question-text">{question.text}</h3>
      <div className="options">
        {question.options.map((option) => (
          <label key={option.text} className="option">
            <input
              type="radio"
              name={question._id} // Group options by question ID
              value={option.text}
              onChange={() => handleOptionChange(question._id, option.text)}
            />
            {option.text}
          </label>
        ))}
      </div>
    </div>
  );
};

export default Question;
