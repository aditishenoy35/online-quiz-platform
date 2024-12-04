const express = require('express');
<<<<<<< HEAD
const { getDefaultQuizzes, getAllQuizzes , getCategories} = require('../controllers/quizController');
const { createQuiz } = require('../controllers/quizCreation');
=======
const { getDefaultQuizzes, getAllQuizzes , getCategories,fetchQuizById} = require('../controllers/quizController');
const { startQuiz, submitResponse, endQuiz } = require('../controllers/QuizStarter');
>>>>>>> 8889a30dfa56f9171325b93176027fd60d655fee

const router = express.Router();

// Fetch 3 default quizzes
router.get('/default-quizzes', getDefaultQuizzes);

// Fetch all quizzes
router.get('/all-quizzes', getAllQuizzes);

//Fetch categories
router.get('/categories', getCategories);

<<<<<<< HEAD
// Create a quiz
router.post('/create', createQuiz);
=======
router.get('/:id', fetchQuizById);
router.post('/:id/start', startQuiz); // Start a quiz
router.post('/:id/response', submitResponse); // Submit a response
router.post('/:id/end', endQuiz); // End a quiz and save responses
>>>>>>> 8889a30dfa56f9171325b93176027fd60d655fee

module.exports = router;
