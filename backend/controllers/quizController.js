const Quiz = require('../models/Quiz');

// Fetch default quizzes
exports.getDefaultQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find({ isDefault: true }).limit(3);
    res.status(200).json(quizzes);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Error fetching quizzes" });
  }
};

// Fetch all quizzes
exports.getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find(); // Fetch all quizzes
    res.status(200).json(quizzes);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Error fetching quizzes" });
  }
};
