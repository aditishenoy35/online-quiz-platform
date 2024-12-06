import React, { useEffect, useState } from 'react';
import QuizFilters from '../component/QuizFilters';
import { fetchAllQuizzes, checkQuizAttempt } from '../api'; // Add API for checking attempts
import Navbar from '../component/Navbar';
import Header from '../component/Header';
import '../styles/Dashboard.css';
import QuizDetails from '../component/QuizDetails';
import ConfirmationDialog from '../component/ConfirmationDialog'; // Import the dialog component
import { useNavigate } from 'react-router-dom';

const QuizView = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [difficulty, setDifficulty] = useState('');
  const [quizScore, setQuizScore] = useState(null);
  const [category, setCategory] = useState('');
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showRetakeDialog, setShowRetakeDialog] = useState(false); // For retake confirmation
  const [userHasTakenQuiz, setUserHasTakenQuiz] = useState(false);
  const [quizToRetake, setQuizToRetake] = useState(null); // Store quiz to retake if confirmed
  const [showQuizDetailsDialog, setShowQuizDetailsDialog] = useState(false); // Control the QuizDetails dialog visibility
  const navigate = useNavigate();

  const userId = localStorage.getItem('userId'); // Retrieve userId from localStorage

  useEffect(() => {
    const fetchAndFilterQuizzes = async () => {
      try {
        const response = await fetchAllQuizzes();
        let filtered = response.data;

        if (difficulty) {
          filtered = filtered.filter((quiz) => quiz.difficulty === difficulty);
        }
        if (category) {
          filtered = filtered.filter((quiz) => quiz.category === category);
        }

        setQuizzes(filtered);
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      }
    };

    fetchAndFilterQuizzes();
  }, [difficulty, category]);

  const handleStartClick = async (quiz) => {
    try {
      const payload = {
        quizId: quiz._id,
        userId: userId, // Retrieved from localStorage
      };
      // Check if the user has already taken this quiz
      const response = await checkQuizAttempt(payload);
      setSelectedQuiz(quiz);

      if (response.data.taken) {
        setUserHasTakenQuiz(true);
        setQuizScore(response.data.score);
        setShowRetakeDialog(true); // Show confirmation dialog for retake
      } else {
        setUserHasTakenQuiz(false);
        setShowQuizDetailsDialog(true); // Show QuizDetails dialog for non-retaken quiz
      }
    } catch (error) {
      console.error('Error checking quiz attempt:', error);
    }
  };

  const handleRetakeConfirmation = () => {
    setShowRetakeDialog(false);
    setShowQuizDetailsDialog(true); // Show QuizDetails dialog after retake confirmation
  };

  const handleProceedToQuiz = () => {
    setShowQuizDetailsDialog(false); // Close the QuizDetails dialog
    navigateToQuiz(); // Proceed to quiz start page
  };

  const navigateToQuiz = (timePerQuestion) => {
    navigate(`/quiz/${selectedQuiz._id}`, { state: { timePerQuestion } });
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
          onClose={() => setShowQuizDetailsDialog(false)} // Close the QuizDetails dialog
          onProceed={handleProceedToQuiz} // Proceed to quiz page
        />
      )}

      {showRetakeDialog && (
        <ConfirmationDialog
          title="Retake Quiz"
          message={`You have already taken this quiz. Your previous score was ${quizScore}. Do you want to retake it?`}
          onConfirm={handleRetakeConfirmation} // Show QuizDetails dialog after confirmation
          onCancel={() => setShowRetakeDialog(false)}
        />
      )}
    </div>
  );
};

export default QuizView;
