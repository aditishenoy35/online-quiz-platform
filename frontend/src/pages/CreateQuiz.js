import React, { useState } from 'react';
import Navbar from '../component/Navbar';
import { quizCreation } from '../api';
import '../styles/Dashboard.css';
import '../styles/CreateQuiz.css';

const CreateQuiz = () => {
  const [quizTitle, setQuizTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('Easy');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [questions, setQuestions] = useState([
    {
      questionText: '',
      options: ['', '', '', ''],
      correctAnswer: '', // Store the option letter (A, B, C, or D)
    },
  ]);
  const [quizSubmitted, setQuizSubmitted] = useState(false); // Tracks if quiz is submitted
  const [showSuccessModal, setShowSuccessModal] = useState(false); // Tracks modal visibility

  const userId = localStorage.getItem('userId'); // Fetch user ID from localStorage

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { questionText: '', options: ['', '', '', ''], correctAnswer: '' },
    ]);
  };

  const updateQuestion = (index, field, value) => {
    const updatedQuestions = [...questions];
    if (field === 'questionText') {
      updatedQuestions[index].questionText = value;
    } else if (field === 'correctAnswer') {
      updatedQuestions[index].correctAnswer = value;
    } else {
      updatedQuestions[index].options[field] = value;
    }
    setQuestions(updatedQuestions);
  };

  const handleSaveQuiz = async () => {
    if (!userId) {
      alert('User ID not found. Please log in.');
      return;
    }

    try {
      const formattedQuestions = questions.map((q) => ({
        text: q.questionText,
        options: q.options.map((optionText, i) => ({
          text: optionText,
          isCorrect: i === parseInt(q.correctAnswer),
        })),
      }));

      const payload = {
        title: quizTitle,
        description,
        category,
        difficulty,
        questions: formattedQuestions,
        createdBy: userId,
      };

      const response = await quizCreation(payload);
      setShowSuccessModal(true); // Show success modal
      setQuizSubmitted(true); // Indicate quiz is submitted
      console.log('Quiz saved successfully:', response.data);
    } catch (error) {
      console.error('Error saving quiz:', error);
      alert('Failed to create quiz. Please try again.');
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', margin: 0 }}>
      {/* Sidebar (Navbar) */}
      <Navbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

      {/* Content Area */}
      <div
        style={{
          flex: 1,
          backgroundColor: '#f4f4f9',
          paddingTop: '0',
          overflowY: 'auto',
          overflowX: 'hidden',
        }}
      >
        <div className="create-quiz-content">
          <h2>Create Your Own Quiz!</h2>
          <form>
            <div className="form-group">
              <label htmlFor="quizTitle">Quiz Title:</label>
              <input
                type="text"
                id="quizTitle"
                value={quizTitle}
                onChange={(e) => setQuizTitle(e.target.value)}
                placeholder="Enter your quiz title here"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <input
                type="text"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter a description for your quiz"
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Category:</label>
              <input
                type="text"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Enter quiz category (e.g., General Knowledge)"
              />
            </div>

            <div className="form-group">
              <label htmlFor="difficulty">Difficulty:</label>
              <select
                id="difficulty"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
              >
                <option value="">Select Difficulty</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>

            <div className="questions-container">
              <h3>Questions</h3>
              {questions.map((question, index) => (
                <div key={index} className="question-group" style={{ marginBottom: '30px' }}>
                  <label style={{ marginBottom: '10px' }}>
                    Question {index + 1}:
                  </label>
                  <input
                    type="text"
                    value={question.questionText}
                    onChange={(e) =>
                      updateQuestion(index, 'questionText', e.target.value)
                    }
                    placeholder={`Enter question ${index + 1}`}
                    style={{ marginBottom: '15px', width: '100%' }}
                  />
                  <div
                    className="options-row"
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      columnGap: '10px',
                      rowGap: '10px',
                      marginBottom: '15px',
                    }}
                  >
                    {['A', 'B', 'C', 'D'].map((letter, i) => (
                      <div
                        key={i}
                        className="option-item"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          marginRight: '10px',
                          width: '48%', // Two options per row
                        }}
                      >
                        <span>{letter}</span>
                        <input
                          type="text"
                          value={question.options[i]}
                          onChange={(e) => updateQuestion(index, i, e.target.value)}
                          placeholder={`Option ${letter}`}
                          style={{ marginLeft: '5px' }}
                        />
                      </div>
                    ))}
                  </div>
                  <div style={{ marginBottom: '20px' }}>
                    <label>Correct Answer:</label>
                    <select
                      value={question.correctAnswer}
                      onChange={(e) =>
                        updateQuestion(index, 'correctAnswer', e.target.value)
                      }
                      style={{
                        display: 'block',  // Ensure it is block-level for alignment
                        width: '100%', // Full width to match the input
                        marginTop: '10px', // Space between dropdown and options
                      }}
                    >
                      <option value="">Select correct option</option>
                      <option value="0">A</option>
                      <option value="1">B</option>
                      <option value="2">C</option>
                      <option value="3">D</option>
                    </select>
                  </div>
                </div>
              ))}
              <div className="button-row">
              {!quizSubmitted ? (
                  <>
                    <button type="button" onClick={addQuestion} className="add-question">
                      Add Question
                    </button>
                    <button type="button" onClick={handleSaveQuiz} className="save-quiz">
                      Submit Quiz
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => window.location.href = '/quizzes'} // Navigate to quizzes
                    className="save-quiz"
                  >
                    Go to Quizzes
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
      {showSuccessModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Quiz Saved Successfully!</h3>
            <button onClick={() => setShowSuccessModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateQuiz;
