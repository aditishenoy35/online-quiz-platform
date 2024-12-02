const express = require('express');
const { getDefaultQuizzes, getAllQuizzes , getCategories} = require('../controllers/quizController');

const router = express.Router();

// Fetch 3 default quizzes
router.get('/default-quizzes', getDefaultQuizzes);

// Fetch all quizzes
router.get('/all-quizzes', getAllQuizzes);

//Fetch categories
router.get('/categories', getCategories);

module.exports = router;
