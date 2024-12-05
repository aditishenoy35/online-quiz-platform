const Quiz = require('../models/Quiz');
const Response = require('../models/Response');

exports.getUserQuizHistory = async (req, res) => {
  const { userId } = req.params; // Extract userId from URL
  try {
    // Fetch quizzes created by the user
    const createdQuizzes = await Quiz.find({ createdBy: userId }).select(
      'title description category difficulty'
    );

    // Fetch responses by the user, including quiz details
    const answeredQuizzes = await Response.find({ user: userId })
      .populate('quiz', 'title description category difficulty') // Populate quiz details
      .select('quiz score submittedAt'); // Include only necessary fields

    res.status(200).json({ createdQuizzes, answeredQuizzes });
  } catch (error) {
    console.error('Error fetching user quiz history:', error.message);
    res.status(500).json({ message: 'Error fetching user quiz history' });
  }
};
