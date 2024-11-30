const express = require('express');
const Quiz = require('../models/Quiz'); // Your Quiz model
const router = express.Router();

// Fetch 3 default quizzes
router.get('/default-quizzes', async (req, res) => {
  try {
    const quizzes = await Quiz.find({ isDefault: true }).limit(3);
    res.status(200).json(quizzes); // Send quizzes to frontend
  } catch (error) {
    res.status(500).json({ message: "Error fetching quizzes" });
  }
});

module.exports = router;
