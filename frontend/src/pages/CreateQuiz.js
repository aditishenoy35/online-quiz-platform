import React, { useState } from 'react';
import Navbar from '../component/Navbar';
import { quizCreation } from '../api';
import '../styles/Dashboard.css';

const CreateQuiz = () => {
  const [quizTitle, setQuizTitle] = useState("Default Quiz Title");
  const [category, setCategory] = useState("General Knowledge");
  const [difficulty, setDifficulty] = useState("easy");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [questions, setQuestions] = useState([
    {
      questionText: '',
      options: ['', '', '', ''],
      correctAnswer: '',
    },
  ]);

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
    try {
      const payload = {
        title: quizTitle,
        category,
        difficulty,
        questions,
      };
      const response = await quizCreation(payload);
      console.log('Quiz saved successfully:', response.data);
      alert('Quiz saved successfully!');
    } catch (error) {
      console.error('Error saving quiz:', error);
      alert('Failed to save quiz. Please try again.');
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', margin: 0  }}>
      <Navbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      <div style={{
          flex: 1,
          backgroundColor: '#f4f4f9',
          marginLeft: isSidebarOpen ? '0px' : '0px', // Adjust margin based on sidebar state
          paddingTop: '0', // Ensure no padding at the top
          overflowY: 'auto', // Allow scrolling
          transition: 'margin-left 0.3s ease', // Smooth transition for margin
        }}>
        <h2>Create Your Own Quiz!</h2>
        <form>
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="quizTitle">Quiz Title:</label>
            <input
              type="text"
              id="quizTitle"
              value={quizTitle}
              onChange={(e) => setQuizTitle(e.target.value)}
              style={{ marginLeft: '10px', padding: '5px' }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="category">Category:</label>
            <input
              type="text"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{ marginLeft: '10px', padding: '5px' }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="difficulty">Difficulty:</label>
            <select
              id="difficulty"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              style={{ marginLeft: '10px', padding: '5px' }}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          <div>
            <h3>Questions</h3>
            {questions.map((question, index) => (
              <div key={index} style={{ marginBottom: '20px' }}>
                <label>Question {index + 1}:</label>
                <input
                  type="text"
                  value={question.questionText}
                  onChange={(e) =>
                    updateQuestion(index, 'questionText', e.target.value)
                  }
                  placeholder={`Enter question ${index + 1}`}
                  style={{ marginLeft: '10px', padding: '5px', width: '300px' }}
                />
                <div style={{ marginLeft: '20px', marginTop: '10px' }}>
                  {question.options.map((option, optionIndex) => (
                    <div key={optionIndex} style={{ marginBottom: '5px' }}>
                      <label>Option {optionIndex + 1}:</label>
                      <input
                        type="text"
                        value={option}
                        onChange={(e) =>
                          updateQuestion(index, optionIndex, e.target.value)
                        }
                        placeholder={`Option ${optionIndex + 1}`}
                        style={{ marginLeft: '10px', padding: '5px' }}
                      />
                    </div>
                  ))}
                  <div style={{ marginTop: '10px' }}>
                    <label>Correct Answer:</label>
                    <select
                      value={question.correctAnswer}
                      onChange={(e) =>
                        updateQuestion(index, 'correctAnswer', e.target.value)
                      }
                      style={{ marginLeft: '10px', padding: '5px' }}
                    >
                      <option value="">Select correct answer</option>
                      {question.options.map((option, optionIndex) => (
                        <option key={optionIndex} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addQuestion}
              style={{
                marginTop: '10px',
                padding: '10px',
                backgroundColor: '#007BFF',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Add Question
            </button>
          </div>
        </form>
        <button
          type="button"
          onClick={handleSaveQuiz}
          style={{
            marginTop: '20px',
            padding: '10px',
            backgroundColor: '#28A745',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Save Quiz
        </button>
      </div>
    </div>
  );
};

export default CreateQuiz;
