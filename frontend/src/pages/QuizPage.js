import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchQuizById, submitQuizResponses } from '../api';
import Question from '../component/Question';
import QuestionTimer from '../component/QuestionTimer';
import '../styles/Start.css'; // Import CSS for styling

const QuizPage = () => {
  const [quiz, setQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState([]);
  const navigate = useNavigate();
  const { quizId } = useParams();

  // Fetch quiz details when the component mounts
  useEffect(() => {
    const getQuiz = async () => {
      try {
        const response = await fetchQuizById(quizId);
        setQuiz(response.data); // Assuming the response contains the quiz data
      } catch (error) {
        console.error('Failed to fetch quiz:', error);
      }
    };
    getQuiz();
  }, [quizId]);

  // Handle the transition to the next question
  const handleNextQuestion = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1); // Move to the next question
    } else {
      submitQuiz(); // Submit quiz when all questions are answered
    }
  };

  // Handle selected option for a question
  const handleOptionChange = (questionId, selectedOption) => {
    setResponses((prevResponses) => {
      const existingResponse = prevResponses.find(
        (response) => response.questionId === questionId
      );
      if (existingResponse) {
        return prevResponses.map((response) =>
          response.questionId === questionId
            ? { ...response, selectedOption }
            : response
        );
      } else {
        return [...prevResponses, { questionId, selectedOption }];
      }
    });
  };

  // Submit the quiz
  const submitQuiz = async () => {
    try {
      const payload = {
        userId: localStorage.getItem('userId'),
        quizId,
        responses,
      };

      const response = await submitQuizResponses(payload);
      const result = response.data;
      if (response.status === 201) {
        navigate('/quiz/results', { state: { score: result.score } });
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error('Failed to submit quiz:', error);
    }
  };

  if (!quiz) return <div>Loading quiz...</div>;

  return (
    <div className="quiz-container">
      <h2 className="quiz-title">{quiz.title}</h2>
      <QuestionTimer onTimeUp={handleNextQuestion} resetKey={currentQuestion} />
      <div className="question-box">
        <Question
          question={quiz.questions[currentQuestion]}
          handleOptionChange={handleOptionChange}
        />
      </div>
      <button className="next-button" onClick={handleNextQuestion}>
        {currentQuestion < quiz.questions.length - 1 ? 'Next' : 'Submit'}
      </button>
    </div>
  );
};

export default QuizPage;
