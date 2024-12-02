const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
const quizRoutes = require('./routes/quizRoutes');
const auth = require('./routes/auth')
require('dotenv').config();

const app = express();
app.use(cors());
// Middleware
app.use(express.json()); // For parsing JSON

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1); // Exit process with failure
  }
};

// Connect to database
connectDB();

//adding route for user authorization
app.use('/api/quizzes',quizRoutes)
app.use('/api/auth', auth);

// Basic Route
app.get('/', (req, res) => {
  res.send('Quiz App Backend is Running!');
});

// Listen on port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
