const express = require('express');
const {
  getDefaultQuizzes,
  getAllQuizzes,
  getCategories,
  fetchQuizById,
} = require('../controllers/quizController');
const {storeResponses} = require('../controllers/QuizStarter');
const { createQuiz } = require('../controllers/quizCreation');

const router = express.Router();

// Fetch 3 default quizzes
router.get('/default-quizzes', getDefaultQuizzes);

// Fetch all quizzes
router.get('/all-quizzes', getAllQuizzes);

// Fetch categories
router.get('/categories', getCategories);

router.post('/create', createQuiz);

// Fetch a quiz by ID
router.get('/:id', fetchQuizById);

// Create a quiz


router.post('/store-responses',storeResponses);
module.exports = router;

