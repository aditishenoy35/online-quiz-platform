const express = require('express');
const mongoose = require('mongoose'); // Ensure this is imported for ObjectId validation
const User = require('../models/User'); // Adjust the path as needed

const getLeaderboard = async (req, res) => {
  try {
    console.log('Fetching leaderboard...');
    
    const leaderboard = await User.find({ quizzesPlayed: { $gt: 0 } })
      .sort({ score: -1 })
      .select('name score quizzesPlayed')
      .limit(10);

    console.log('Leaderboard fetched successfully:', leaderboard);

    res.status(200).json({
      success: true,
      data: leaderboard,
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
