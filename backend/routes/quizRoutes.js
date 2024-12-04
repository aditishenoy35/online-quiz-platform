const express = require('express');
const { getDefaultQuizzes, getAllQuizzes , getCategories} = require('../controllers/quizController');
const { createQuiz } = require('../controllers/quizCreation');

const router = express.Router();

// Fetch 3 default quizzes
router.get('/default-quizzes', getDefaultQuizzes);

// Fetch all quizzes
router.get('/all-quizzes', getAllQuizzes);

//Fetch categories
router.get('/categories', getCategories);

// Create a quiz
router.post('/create', createQuiz);

module.exports = router;
