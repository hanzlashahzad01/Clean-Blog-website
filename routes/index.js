const express = require('express');
const router = express.Router();
const BlogPost = require('../models/BlogPost');

// Home page
router.get('/', async (req, res) => {
  try {
    const posts = await BlogPost.find()
      .populate('author', 'username')
      .sort({ createdAt: -1 })
      .limit(10);
    
    res.render('index', {
      title: 'Clean Blog - Home',
      posts: posts,
      user: req.session.userId ? { username: req.session.username } : null
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.render('index', {
      title: 'Clean Blog - Home',
      posts: [],
      user: req.session.userId ? { username: req.session.username } : null
    });
  }
});

// About page
router.get('/about', (req, res) => {
  res.render('about', {
    title: 'Clean Blog - About',
    user: req.session.userId ? { username: req.session.username } : null
  });
});

// Contact page
router.get('/contact', (req, res) => {
  res.render('contact', {
    title: 'Clean Blog - Contact',
    user: req.session.userId ? { username: req.session.username } : null
  });
});

module.exports = router;
