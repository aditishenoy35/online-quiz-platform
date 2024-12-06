import React, { useEffect, useState } from "react";
import { getQuizResults } from "./api"; // Make sure the path is correct to where your API functions are stored

const ReviewForm = ({ responseId }) => {
  const [quizData, setQuizData] = useState(null); // Holds the quiz data
  const [currentSlide, setCurrentSlide] = useState(0); // To track the current slide
  const [correctAnswers, setCorrectAnswers] = useState([]);

  useEffect(() => {
    // Fetch the quiz response data using the responseId
    getQuizResults(responseId)
      .then(response => {
        setQuizData(response.data);
        setCorrectAnswers(response.data.correctResponses);
      })
      .catch(error => console.error("Error fetching quiz results:", error));
  }, [responseId]);

  const handleNext = () => {
    if (currentSlide < quizData.correctResponses.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handlePrevious = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  if (!quizData) return <div>Loading...</div>;

  const currentQuestion = quizData.correctResponses[currentSlide];

  return (
    <div className="review-form">
      <div className="question-slide">
        <p>{currentQuestion.questionText}</p>
        <div className="options">
          {currentQuestion.options.map((option, index) => {
            // Highlight selected option based on whether it's correct or not
            const isSelected = option.text === currentQuestion.selectedOption;
            const isCorrect = option.isCorrect;
            return (
              <div
                key={index}
                className={`option ${isSelected ? (isCorrect ? "correct" : "incorrect") : ""}`}
              >
                {option.text}
              </div>
            );
          })}
        </div>
      </div>

      <div className="navigation-buttons">
        <button onClick={handlePrevious} disabled={currentSlide === 0}>
          Previous
        </button>
        <button onClick={handleNext} disabled={currentSlide === quizData.correctResponses.length - 1}>
          Next
        </button>
      </div>
    </div>
  );
};

export default ReviewForm;
