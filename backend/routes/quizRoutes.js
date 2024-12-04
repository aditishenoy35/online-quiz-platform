const express = require('express');
const {
  getDefaultQuizzes,
  getAllQuizzes,
  getCategories,
  fetchQuizById,
} = require('../controllers/quizController');
const { createQuiz } = require('../controllers/quizCreation');
const { startQuiz, submitResponse, endQuiz } = require('../controllers/QuizStarter');

const router = express.Router();

// Fetch 3 default quizzes
router.get('/default-quizzes', getDefaultQuizzes);

// Fetch all quizzes
router.get('/all-quizzes', getAllQuizzes);

// Fetch categories
router.get('/categories', getCategories);

// Fetch a quiz by ID
router.get('/quiz/:id', fetchQuizById);

// Create a quiz
router.post('/create', createQuiz);

// Start a quiz
router.post('/start', startQuiz);

// Submit a quiz response
router.post('/submit', submitResponse);

// End a quiz
router.post('/end', endQuiz);

module.exports = router;

