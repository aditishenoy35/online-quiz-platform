const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    score: { type: Number, default: 0 }, // Total score for leaderboard
    quizzesPlayed: { type: Number, default: 0 }, // Number of quizzes attempted
    highestScore: { type: Number, default: 0 },
  });

  module.exports = mongoose.model('User', UserSchema);