const express = require('express');
const { getDefaultQuizzes, getAllQuizzes , getCategories,fetchQuizById} = require('../controllers/quizController');
const { startQuiz, submitResponse, endQuiz } = require('../controllers/QuizStarter');

const router = express.Router();

// Fetch 3 default quizzes
router.get('/default-quizzes', getDefaultQuizzes);

// Fetch all quizzes
router.get('/all-quizzes', getAllQuizzes);

//Fetch categories
router.get('/categories', getCategories);

router.get('/:id', fetchQuizById);
router.post('/:id/start', startQuiz); // Start a quiz
router.post('/:id/response', submitResponse); // Submit a response
router.post('/:id/end', endQuiz); // End a quiz and save responses

module.exports = router;
