import React, { useState } from 'react';
import '../styles/Dashboard.css';

const QuizDetails = ({ quiz, onClose, onProceed }) => {
  const [timePerQuestion, setTimePerQuestion] = useState(30); // Default 30 seconds

  const handleTimeChange = (event) => {
    setTimePerQuestion(Number(event.target.value)); // Update time per question
  };

  const proceedWithTime = () => {
    onProceed(timePerQuestion); // Pass the selected time to the onProceed function
  };

  const numberOfQuestions = quiz.questions ? quiz.questions.length : 0; // Get the number of questions

  return (
    <div className="quiz-details-overlay">
      <div className="quiz-details-modal">
        <h2>{quiz.title}</h2>
        <p><strong>Category:</strong> {quiz.category}</p>
        <p><strong>Difficulty:</strong> {quiz.difficulty}</p>
        <p><strong>Description:</strong> {quiz.description}</p>
        <p><strong>Number of Questions:</strong> {numberOfQuestions}</p> 
        <p>
          <strong>Instructions:</strong> Please answer all questions carefully. Once you start the
          quiz, the timer cannot be paused. Each Question carries 10 points.
        </p>
        <div>
          <label htmlFor="time-per-question">
            <strong>Set Time Per Question:</strong>
          </label>
          <input
            id="time-per-question"
            type="range"
            min="30"
            max="120"
            step="10"
            value={timePerQuestion}
            onChange={handleTimeChange}
          />
          <p>{timePerQuestion} seconds</p>
        </div>
        <div className="quiz-details-actions">
          <button onClick={onClose} className="btn-cancel">
            Cancel
          </button>
          <button onClick={proceedWithTime} className="btn-proceed">
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizDetails;
