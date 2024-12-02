const express = require('express');
const { getDefaultQuizzes, getAllQuizzes } = require('../controllers/quizController');

const router = express.Router();

// Fetch 3 default quizzes
router.get('/default-quizzes', getDefaultQuizzes);

// Fetch all quizzes
router.get('/all-quizzes', getAllQuizzes);

module.exports = router;
