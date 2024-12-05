const express = require('express');
const {
  getDefaultQuizzes,
  getAllQuizzes, 
  getCategories,
  fetchQuizById,
} = require('../controllers/quizController');
const {storeResponses} = require('../controllers/QuizStarter');
const { createQuiz } = require('../controllers/quizCreation');
const { getCreatedQuizzesHistory, getAnsweredQuizzesHistory } = require('../controllers/quizhistory');
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
router.get('/createhistory/:userId', getCreatedQuizzesHistory)
router.get('/answerhistory/:userId',getAnsweredQuizzesHistory)

router.post('/store-responses',storeResponses);
module.exports = router;

