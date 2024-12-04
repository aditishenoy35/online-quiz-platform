import React, { useState, useEffect } from 'react';
import { useNavigate, useParams} from 'react-router-dom';
import { fetchQuizById, submitQuizResponses } from '../api';  // Import the API function
import Question from '../component/Question';
import QuestionTimer from '../component/QuestionTimer';

const QuizPage = () => {
  const [quiz, setQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState([]);
  const navigate = useNavigate();
  const { quizId } = useParams();

  // Fetch quiz details when component mounts
  useEffect(() => {
    const getQuiz = async () => {
      try {
        const response = await fetchQuizById(quizId); // Using the API function
        setQuiz(response.data); // Assuming the response contains the quiz data
      } catch (error) {
        console.error('Failed to fetch quiz:', error);
      }
    };
    getQuiz();
  }, [quizId]);

  // Handle next question transition
  const handleNextQuestion = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      submitQuiz();
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

      const response = await submitQuizResponses(payload);  // Using the API function
      console.log(response);
      const result = response.data;
      if (response.status === 201) {
        alert(`Quiz submitted! Your score: ${result.score}`);
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
    <div>
      <h2>{quiz.title}</h2>
      <QuestionTimer onTimeUp={handleNextQuestion} />
      <Question
        question={quiz.questions[currentQuestion]}
        handleOptionChange={handleOptionChange}
      />
      <button onClick={handleNextQuestion}>Next</button>
    </div>
  );
};

export default QuizPage;
