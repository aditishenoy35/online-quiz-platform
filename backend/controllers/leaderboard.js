 // Ensure this is imported for ObjectId validation
const User = require('../models/User'); // Adjust the path as needed

const getLeaderboard = async (req, res) => {
  try {
    console.log('Fetching leaderboard...');

    const leaderboard = await User.find({ quizzesPlayed: { $gt: 0 } })
      .sort({ score: -1 })
      .select('name score quizzesPlayed')
      .limit(10);

    // Convert ObjectId to string
    const leaderboardData = leaderboard.map(user => ({
      ...user.toObject(), // Convert Mongoose object to plain JS object
      _id: user._id.toString(), // Ensure _id is a string
    }));

    if (!leaderboardData.length) {
      return res.status(200).json({
        success: true,
        data: [],
        message: 'No leaderboard data available.',
      });
    }

    console.log('Leaderboard fetched successfully:', leaderboardData);

    res.status(200).json({
      success: true,
      data: leaderboardData,
    });
  } catch (error) {
    console.error('Error fetching leaderboard:', error);

    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

module.exports = { getLeaderboard };