const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');

// Middleware to check if user is already logged in
const redirectIfAuthenticated = (req, res, next) => {
  if (req.session.userId) {
    return res.redirect('/');
  }
  next();
};

// Register page
router.get('/register', redirectIfAuthenticated, (req, res) => {
  res.render('users/register', {
    title: 'Clean Blog - Register',
    user: req.session.userId ? { username: req.session.username } : null
  });
});

// Handle registration
router.post('/register', [
  body('username')
    .isLength({ min: 3, max: 20 })
    .withMessage('Username must be between 3 and 20 characters')
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('Username can only contain letters, numbers, and underscores'),
  body('email')
    .isEmail()
    .withMessage('Please enter a valid email')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('password2')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords do not match');
      }
      return true;
    })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map(error => error.msg);
      req.flash('error_msg', errorMessages.join(', '));
      return res.redirect('/users/register');
    }

    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email: email }, { username: username }]
    });

    if (existingUser) {
      req.flash('error_msg', 'User with this email or username already exists');
      return res.redirect('/users/register');
    }

    // Create new user
    const newUser = new User({
      username,
      email,
      password
    });

    await newUser.save();
    req.flash('success_msg', 'Registration successful! Please log in.');
    res.redirect('/users/login');

  } catch (error) {
    console.error('Registration error:', error);
    req.flash('error_msg', 'Registration failed. Please try again.');
    res.redirect('/users/register');
  }
});

// Login page
router.get('/login', redirectIfAuthenticated, (req, res) => {
  res.render('users/login', {
    title: 'Clean Blog - Login',
    user: req.session.userId ? { username: req.session.username } : null
  });
});

// Handle login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      req.flash('error_msg', 'Username and password are required');
      return res.redirect('/users/login');
    }

    // Find user by username or email
    const user = await User.findOne({
      $or: [{ username: username }, { email: username }]
    });

    if (!user) {
      req.flash('error_msg', 'Invalid username or password');
      return res.redirect('/users/login');
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      req.flash('error_msg', 'Invalid username or password');
      return res.redirect('/users/login');
    }

    // Set session
    req.session.userId = user._id;
    req.session.username = user.username;
    req.flash('success_msg', 'Login successful!');
    res.redirect('/');

  } catch (error) {
    console.error('Login error:', error);
    req.flash('error_msg', 'Login failed. Please try again.');
    res.redirect('/users/login');
  }
});

// Handle logout
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Logout error:', err);
    }
    res.redirect('/');
  });
});

// Logout route (GET method for easier navigation)
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Logout error:', err);
    }
    res.redirect('/');
  });
});

module.exports = router;
