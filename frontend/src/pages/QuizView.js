import React, { useEffect, useState } from 'react';
import QuizFilters from '../component/QuizFilters';
import { fetchAllQuizzes, checkQuizAttempt } from '../api';
import Navbar from '../component/Navbar';
import Header from '../component/Header';
import '../styles/Dashboard.css';
import QuizDetails from '../component/QuizDetails';
import ConfirmationDialog from '../component/ConfirmationDialog';
import { useNavigate } from 'react-router-dom';

const QuizView = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [difficulty, setDifficulty] = useState('');
  const [category, setCategory] = useState('');
  const [includeUserQuizzes, setIncludeUserQuizzes] = useState(true);
  const [includeDefaultQuizzes, setIncludeDefaultQuizzes] = useState(true);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showRetakeDialog, setShowRetakeDialog] = useState(false);
  const [quizScore, setQuizScore] = useState(null);
  const [showQuizDetailsDialog, setShowQuizDetailsDialog] = useState(false);
  const [timePerQuestion, setTimePerQuestion] = useState(30); // Default 30 seconds
  const navigate = useNavigate();

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchAndFilterQuizzes = async () => {
      try {
        const response = await fetchAllQuizzes({
          difficulty,
          category,
          includeUserQuizzes,
          includeDefaultQuizzes,
        });
        setQuizzes(response.data);
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      }
    };

    fetchAndFilterQuizzes();
  }, [difficulty, category, includeUserQuizzes, includeDefaultQuizzes]);

  const handleStartClick = async (quiz) => {
    try {
      const payload = {
        quizId: quiz._id,
        userId,
      };
      const response = await checkQuizAttempt(payload);
      setSelectedQuiz(quiz);

      if (response.data.taken) {
        setQuizScore(response.data.score);
        setShowRetakeDialog(true);
      } else {
        setShowQuizDetailsDialog(true);
      }
    } catch (error) {
      console.error('Error checking quiz attempt:', error);
    }
  };

  const handleRetakeConfirmation = () => {
    setShowRetakeDialog(false);
    setShowQuizDetailsDialog(true);
  };

  const handleProceedToQuiz = (selectedTime) => {
    setTimePerQuestion(selectedTime);
    setShowQuizDetailsDialog(false);
    navigateToQuiz(selectedTime);
  };

  const navigateToQuiz = (selectedTime) => {
    navigate(`/quiz/${selectedQuiz._id}`, { state: { timePerQuestion: selectedTime } });
  };

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', margin: 0 }}>
      <Navbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      <div style={{ flex: 1, backgroundColor: '#f4f4f9', paddingTop: '0', overflowY: 'auto', overflowX: 'hidden' }}>
        <Header />
        <div style={{ padding: '20px' }}>
          <QuizFilters
            difficulty={difficulty}
            setDifficulty={setDifficulty}
            category={category}
            setCategory={setCategory}
            includeUserQuizzes={includeUserQuizzes}
            setIncludeUserQuizzes={setIncludeUserQuizzes}
            includeDefaultQuizzes={includeDefaultQuizzes}
            setIncludeDefaultQuizzes={setIncludeDefaultQuizzes}
          />

          <div className="quiz-list">
            {quizzes.length > 0 ? (
              quizzes.map((quiz) => (
                <div key={quiz._id} className="quiz-card">
                  <h2 className="header">{quiz.title}</h2>
                  <p>Category: {quiz.category}</p>
                  <p>Difficulty: {quiz.difficulty}</p>
                  <p>{quiz.description}</p>
                  <button
                    onClick={() => handleStartClick(quiz)}
                    className="btn-start-quiz"
                  >
                    Start Quiz
                  </button>
                </div>
              ))
            ) : (
              <p>No quizzes found</p>
            )}
          </div>
        </div>
      </div>

      {showQuizDetailsDialog && (
        <QuizDetails
          quiz={selectedQuiz}
          onClose={() => setShowQuizDetailsDialog(false)}
          onProceed={handleProceedToQuiz}
        />
      )}

      {showRetakeDialog && (
        <ConfirmationDialog
          title="Retake Quiz"
          message={`You have already taken this quiz. Your previous score was ${quizScore}. Do you want to retake it? All your progress will be lost. Visit the history page to review your answers.`}
          onConfirm={handleRetakeConfirmation}
          onCancel={() => setShowRetakeDialog(false)}
        />
      )}
    </div>
  );
};

export default QuizView;
