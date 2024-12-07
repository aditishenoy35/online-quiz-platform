const express = require('express');
const { body } = require('express-validator');
const { registerUser, loginUser, getUser} = require('../controllers/userCreation');

const router = express.Router();

// Registration Route
router.post(
  '/register',
  [
    body('name', 'Name is required').notEmpty(),
    body('email', 'Please enter a valid email').isEmail(),
    body('password', 'Password must be at least 6 characters long').isLength({ min: 6 }),
  ],
  registerUser
);

// Login Route
router.post(
  '/login',
  [
    body('email', 'Please enter a valid email').isEmail(),
    body('password', 'Password is required').exists(),
  ],
  loginUser
);

router.get('/:userId',getUser);

module.exports = router;
