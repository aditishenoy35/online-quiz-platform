const express = require('express');
const {
  getDefaultQuizzes,
  getAllQuizzes, 
  getCategories,
  fetchQuizById,
} = require('../controllers/quizController');
const {storeResponses, getQuizResults, hasUserTakenQuiz} = require('../controllers/QuizStarter');
const { createQuiz } = require('../controllers/quizCreation');
const { getUserQuizHistory, deleteUserQuiz, getQuizWithResponses } = require('../controllers/quizhistory');
const { getLeaderboard } = require('../controllers/leaderboard');
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
router.get('/history/:userId', getUserQuizHistory);

router.get('/getresults/:responseId',getQuizResults);

router.post('/store-responses',storeResponses);

router.delete('/user/:userId/quiz/:quizId', deleteUserQuiz);

router.post('/attempt', hasUserTakenQuiz);

router.post('/leaderboard', getLeaderboard);

router.get('/responsequiz/:responseId',getQuizWithResponses);

module.exports = router;

