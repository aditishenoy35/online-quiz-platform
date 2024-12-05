const express = require('express');
const {
  getDefaultQuizzes,
  getAllQuizzes, 
  getCategories,
  fetchQuizById,
} = require('../controllers/quizController');
const {storeResponses, getQuizResults} = require('../controllers/QuizStarter');
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
/*router.get('/createhistory', getCreatedQuizzesHistory)
router.get('/answerhistory',getAnsweredQuizzesHistory)*/
router.get('/created/:userId', (req, res) => {
  const userId = req.params.userId;
  const createdQuizzes = quizzes.filter((quiz) => quiz.creator === userId);
  res.json(createdQuizzes);
});

router.get('/getresults/:responseId',getQuizResults);
router.get('/answered/:userId', (req, res) => {
  const userId = req.params.userId;
  const answeredQuizzes = responses.filter((response) => response.quiz.creator === userId);
  res.json(answeredQuizzes);
}
);
router.post('/store-responses',storeResponses);
module.exports = router;

