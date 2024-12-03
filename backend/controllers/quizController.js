//commit try
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

// Fetch quizzes with optional filters for difficulty and category
exports.getAllQuizzes = async (req, res) => {
  try {
    const { difficulty, category } = req.query;

    // Build the query object dynamically based on provided filters
    const filter = {};
    if (difficulty) {
      filter.difficulty = difficulty;
    }
    if (category) {
      filter.category = category;
    }

    const quizzes = await Quiz.find(filter); // Fetch quizzes based on filters
    res.status(200).json(quizzes);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Error fetching quizzes" });
  }
};

// Fetch unique quiz categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Quiz.distinct("category"); // Get distinct categories
    res.status(200).json(categories);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Error fetching categories" });
  }
};
