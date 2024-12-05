const Quiz = require('../models/Quiz'); // Adjust the path based on your folder structure

// Controller to create a new quiz
const createQuiz = async (req, res) => {
  try {
    const { title, description, category, difficulty, questions, createdBy } = req.body;

    // Validation
    if (!title || !category || !difficulty || !questions || questions.length === 0) {
      return res.status(400).json({ message: 'Please provide all required fields: title, category, difficulty, and questions.' });
    }

    // Create a new quiz document
    const newQuiz = new Quiz({
      title,
      description,
      category,
      difficulty,
      questions,
      createdBy,
    });

    // Save the quiz to the database
    await newQuiz.save();

    res.status(201).json({ message: 'Quiz created successfully!', quiz: newQuiz });
  } catch (error) {
    console.error('Error creating quiz:', error);
    res.status(500).json({ message: 'Server error. Could not create quiz.', error: error.message });
  }
};

module.exports = { createQuiz };
