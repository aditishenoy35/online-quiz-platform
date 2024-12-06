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

exports.getAllQuizzes = async (req, res) => {
  const { difficulty, category, includeUserQuizzes, includeDefaultQuizzes } = req.query;

  try {
    const filter = {};

    // Apply difficulty and category filters
    if (difficulty) filter.difficulty = difficulty;
    if (category) filter.category = category;

    // Apply filters for user-created and default quizzes
    const orFilters = [];
    if (includeUserQuizzes === 'true') orFilters.push({ createdBy: { $ne: null } });
    if (includeDefaultQuizzes === 'true') orFilters.push({ isDefault: true });

    if (orFilters.length > 0) filter.$or = orFilters;

    // Fetch quizzes from the database
    const quizzes = await Quiz.find(filter);
    res.status(200).json(quizzes);
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    res.status(500).json({ error: 'Error fetching quizzes' });
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

// Fetch quiz details by ID
exports.fetchQuizById = async (req, res) => {
  const quizId = req.params.id;
  try {
    const quiz = await Quiz.findById(quizId);
    if (!quiz) return res.status(404).json({ error: 'Quiz not found' });

    res.status(200).json(quiz);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

