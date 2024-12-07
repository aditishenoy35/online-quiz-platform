import React, { useEffect, useState } from "react";
import { getQuizWithResponses } from "../api"; // Adjust the path to your API functions
import "../styles/ReviewForm.css";

const ReviewForm = ({ responseId }) => {
  const [quizData, setQuizData] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    // Fetch the quiz response data
    getQuizWithResponses(responseId)
      .then((response) => {
        console.log("Quiz data:", response.data);
        setQuizData(response.data);
      })
      .catch((error) => console.error("Error fetching quiz results:", error));
  }, [responseId]);

  if (!quizData || !quizData.mergedData || quizData.mergedData.length === 0) {
    return <div>Loading...</div>;
  }

  // Get the current question based on the current slide
  const currentQuestion = quizData.mergedData[currentSlide];

  return (
    <div className="review-form">
      
      <div className="question-slide">
        <p className="question-text">{currentQuestion.questionText}</p>
        <div className="review-options">
          {currentQuestion.options.map((option, index) => {
            // Highlight only the selected option
            const isSelected = option.text === currentQuestion.selectedOption;
            const isCorrect = option.isCorrect;

            return (
              <div
                key={index}
                className={`review-option ${
                  isSelected
                    ? isCorrect
                      ? "selected-correct"
                      : "selected-incorrect"
                    : ""
                }`}
              >
                {option.text}
              </div>
            );
          })}
        </div>
      </div>

      <div className="navigation-buttons">
        <button onClick={() => setCurrentSlide((prev) => Math.max(prev - 1, 0))} disabled={currentSlide === 0}>
          Previous
        </button>
        <button
          onClick={() =>
            setCurrentSlide((prev) => Math.min(prev + 1, quizData.mergedData.length - 1))
          }
          disabled={currentSlide === quizData.mergedData.length - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ReviewForm;
