import React from 'react';

const Question = ({ question, handleOptionChange }) => {
  return (
    <div>
      <h3>{question.text}</h3>
      {question.options.map((option) => (
        <label key={option.text}>
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
  );
};

export default Question;
