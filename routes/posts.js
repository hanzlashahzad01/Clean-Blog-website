const express = require('express');
const router = express.Router();
const BlogPost = require('../models/BlogPost');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../public/img/uploads');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

// Middleware to check if user is authenticated
const ensureAuthenticated = (req, res, next) => {
  if (req.session.userId) {
    return next();
  }
  req.flash('error_msg', 'Please log in to access this page');
  res.redirect('/users/login');
};

// Show all posts (home page)
router.get('/', async (req, res) => {
  try {
    const posts = await BlogPost.find()
      .populate('author', 'username')
      .sort({ createdAt: -1 });
    
    res.redirect('/');
  } catch (error) {
    console.error('Error fetching posts:', error);
    req.flash('error_msg', 'Error loading posts');
    res.redirect('/');
  }
});

// Show form for creating new post
router.get('/new', ensureAuthenticated, (req, res) => {
  res.render('posts/new', {
    title: 'Clean Blog - New Post',
    user: req.session.userId ? { username: req.session.username } : null
  });
});

// Create new post
router.post('/', ensureAuthenticated, upload.single('image'), async (req, res) => {
  try {
    const { title, body } = req.body;
    
    if (!title || !body) {
      req.flash('error_msg', 'Title and body are required');
      return res.redirect('/posts/new');
    }
    
    const postData = {
      title,
      body,
      author: req.session.userId
    };
    
    if (req.file) {
      postData.image = `/img/uploads/${req.file.filename}`;
    }
    
    const newPost = new BlogPost(postData);
    await newPost.save();
    
    req.flash('success_msg', 'Post created successfully!');
    res.redirect(`/posts/${newPost._id}`);
  } catch (error) {
    console.error('Error creating post:', error);
    req.flash('error_msg', 'Error creating post');
    res.redirect('/posts/new');
  }
});

// Show single post
router.get('/:id', async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id)
      .populate('author', 'username');
    
    if (!post) {
      req.flash('error_msg', 'Post not found');
      return res.redirect('/');
    }
    
    res.render('posts/show', {
      title: `Clean Blog - ${post.title}`,
      post: post,
      user: req.session.userId ? { username: req.session.username } : null
    });
  } catch (error) {
    console.error('Error fetching post:', error);
    req.flash('error_msg', 'Error loading post');
    res.redirect('/');
  }
});

// Delete post (optional feature)
router.delete('/:id', ensureAuthenticated, async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    
    if (!post) {
      req.flash('error_msg', 'Post not found');
      return res.redirect('/');
    }
    
    // Check if user owns the post
    if (post.author.toString() !== req.session.userId) {
      req.flash('error_msg', 'Not authorized to delete this post');
      return res.redirect('/');
    }
    
    await BlogPost.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Post deleted successfully');
    res.redirect('/');
  } catch (error) {
    console.error('Error deleting post:', error);
    req.flash('error_msg', 'Error deleting post');
    res.redirect('/');
  }
});

module.exports = router;
