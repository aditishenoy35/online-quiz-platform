const Quiz = require('../models/Quiz');
const Response = require('../models/Response');

// Fetch quizzes created by a specific user
exports.getCreatedQuizzesHistory = async (req, res) => {
  const { userId } = req.params; // Extract userId from URL
  try {
    const createdQuizzes = await Quiz.find({ createdBy: userId })
      .select('title description category difficulty createdAt'); // Fetch required fields
    res.status(200).json(createdQuizzes);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Error fetching created quizzes history' });
  }
};

// Fetch quizzes answered by a specific user
exports.getAnsweredQuizzesHistory = async (req, res) => {
  const { userId } = req.params; // Extract userId from URL
  try {
    const answeredHistory = await Response.find({ user: userId })
      .populate('quiz', 'title description category difficulty') // Populate quiz details
      .select('quiz score submittedAt'); // Fetch required fields
    res.status(200).json(answeredHistory);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Error fetching answered quizzes history' });
  }
};
