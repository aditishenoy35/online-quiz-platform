const mongoose = require('mongoose');

const ResponseSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User
  quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true }, // Reference to Quiz
  responses: [
    {
      questionId: { type: mongoose.Schema.Types.ObjectId, required: true }, // Reference to question
      selectedOption: { type: String, required: true }, // User's selected option
      isCorrect: { type: Boolean }, // Whether the response is correct
    }
  ],
  score: { type: Number, default: 0 }, // Score for the quiz
  submittedAt: { type: Date, default: Date.now }, // When the response was submitted
});

module.exports = mongoose.model('Response', ResponseSchema);
