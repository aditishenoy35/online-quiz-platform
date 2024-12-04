const Quiz = require('../models/Quiz'); // Assuming this is the Quiz model where the structure is saved

const createQuiz = async (req, res) => {
    try {
      const { title, category, difficulty, questions } = req.body;
  
      // Validate request body
      if (!title || !category || !difficulty || !questions || questions.length === 0) {
        return res.status(400).json({ message: 'All fields are required, and at least one question must be provided.' });
      }
  
      // Validate each question structure (ensure options and correctAnswer are provided)
      for (let i = 0; i < questions.length; i++) {
        const { questionText, options, correctAnswer } = questions[i];
  
        // Check if question has exactly 4 options
        if (!questionText || !options || options.length !== 4 || !correctAnswer) {
          return res.status(400).json({
            message: `Each question must have exactly 4 options and a correct answer. Issue with question ${i + 1}.`,
          });
        }
  
        // Check if correct answer exists within the options
        if (!options.includes(correctAnswer)) {
          return res.status(400).json({
            message: `The correct answer must be one of the provided options. Issue with question ${i + 1}.`,
          });
        }
  
        // Create a new array of options with 'isCorrect' field for each option
        const updatedOptions = options.map(option => ({
          text: option,
          isCorrect: option === correctAnswer,  // Mark the correct option
        }));
  
        // Update the question with the new options array
        questions[i].options = updatedOptions;
      }
  
      // Create a new quiz
      const newQuiz = new Quiz({
        title,
        category,
        difficulty,
        questions, // Array of questions with updated options
      });
  
      // Save quiz to the database
      const savedQuiz = await newQuiz.save();
  
      // Respond with success message and saved quiz
      res.status(201).json({
        message: 'Quiz created successfully!',
        quiz: savedQuiz,
      });
    } catch (err) {
      console.error('Error creating quiz:', err.message);
      res.status(500).json({ message: 'Server error. Could not create quiz.' });
    }
  };
    
module.exports = {
  createQuiz,
};
