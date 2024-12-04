import React, { useState } from 'react';
import Navbar from '../component/Navbar';

const CreateQuiz = () => {
  const [questions, setQuestions] = useState([
    {
      questionText: '',
      options: ['', '', '', ''],
      correctAnswer: '', // Added correctAnswer field for each question
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

  return (
    <div style={{ display: 'flex' }}>
      <Navbar />
      <div style={{ padding: '20px', flex: 1 }}>
        <h2>Create Your Own Quiz!</h2>
        <form>
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="quizTitle">Quiz Title:</label>
            <input
              type="text"
              id="quizTitle"
              defaultValue="Default Quiz Title"
              style={{ marginLeft: '10px', padding: '5px' }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="category">Category:</label>
            <input
              type="text"
              id="category"
              defaultValue="General Knowledge"
              style={{ marginLeft: '10px', padding: '5px' }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="difficulty">Difficulty:</label>
            <select
              id="difficulty"
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
      </div>
    </div>
  );
};

export default CreateQuiz;
