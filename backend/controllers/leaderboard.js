const User = require('./models/User'); // Assuming the User model is in the models folder
const Response = require('./models/Response'); // Assuming the Response model is in the models folder

/**
 * Get leaderboard based on users' average quiz scores.
 * @returns {Promise<Array>} Leaderboard data sorted by average scores.
 */
const getLeaderboard = async () => {
  try {
    // Fetch all users with their total score and quizzes played
    const users = await User.find({}).select('name score quizzesPlayed').lean();

    // Calculate the average score for each user
    const leaderboard = users.map(user => {
      const averageScore = user.quizzesPlayed > 0 
        ? (user.score / user.quizzesPlayed).toFixed(2) 
        : 0;
      return { name: user.name, averageScore };
    });

    // Sort by average score in descending order
    leaderboard.sort((a, b) => b.averageScore - a.averageScore);

    return leaderboard;
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    throw error;
  }
};

module.exports = { getLeaderboard };
