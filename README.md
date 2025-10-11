# Clean Blog Website

A complete blog website built with Node.js, Express, and MongoDB, following Greg Lim's "Beginning Node.js, Express & MongoDB Development" book.

## Features

- 🏠 **Home Page** - Display all blog posts with pagination
- 📖 **Single Post Page** - Full post view with image support
- 🧑‍💻 **User Authentication** - Register and login functionality
- ✍️ **Create New Post** - Only logged-in users can add posts
- 🗂️ **MongoDB Integration** - Posts and users stored in MongoDB
- 🖼️ **Image Upload** - Support for post images using Multer
- ⚙️ **Form Validation** - Client and server-side validation
- 🔐 **Authentication Middleware** - Protected routes for logged-in users
- 💅 **Clean Blog Theme** - Beautiful Bootstrap-based design
- ☁️ **Deployment Ready** - Configured for MongoDB Atlas and Heroku

## Technology Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Frontend**: EJS templating, Bootstrap 5
- **Authentication**: Express Sessions, bcryptjs
- **File Upload**: Multer
- **Validation**: Express Validator

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd clean-blog
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```
   MONGODB_URI=mongodb://localhost:27017/clean-blog
   SESSION_SECRET=your-super-secret-session-key-here
   PORT=3000
   ```

4. **Start MongoDB**
   Make sure MongoDB is running on your system. For local development:
   ```bash
   mongod
   ```

5. **Run the application**
   ```bash
   npm start
   ```
   
   For development with auto-restart:
   ```bash
   npm run dev
   ```

6. **Access the application**
   Open your browser and go to `http://localhost:3000`

## Project Structure

```
clean-blog/
├── models/                 # Database models
│   ├── BlogPost.js        # Blog post schema
│   └── User.js            # User schema
├── public/                # Static files
│   ├── css/              # Stylesheets
│   ├── js/               # JavaScript files
│   └── img/              # Images and uploads
├── routes/               # Express routes
│   ├── index.js          # Main routes (home, about, contact)
│   ├── posts.js          # Post-related routes
│   └── users.js          # User authentication routes
├── views/                # EJS templates
│   ├── partials/         # Reusable components
│   ├── posts/            # Post-related views
│   ├── users/            # User authentication views
│   ├── layout.ejs        # Main layout template
│   ├── index.ejs         # Home page
│   ├── about.ejs         # About page
│   └── contact.ejs       # Contact page
├── index.js              # Main application file
├── package.json          # Dependencies and scripts
└── README.md             # This file
```

## Usage

### Creating a New Post

1. Register an account or login
2. Click "New Post" in the navigation
3. Fill in the title, content, and optionally upload an image
4. Click "Create Post"

### User Authentication

- **Register**: Create a new account with username, email, and password
- **Login**: Sign in with username/email and password
- **Logout**: End your session

### Database Models

**BlogPost Schema:**
- title (String, required)
- body (String, required)
- image (String, optional)
- author (ObjectId, reference to User)
- createdAt (Date, auto-generated)
- updatedAt (Date, auto-updated)

**User Schema:**
- username (String, required, unique)
- email (String, required, unique)
- password (String, required, hashed)
- createdAt (Date, auto-generated)

## Deployment

### MongoDB Atlas Setup

1. Create a MongoDB Atlas account
2. Create a new cluster
3. Get your connection string
4. Update the `MONGODB_URI` in your `.env` file

### Heroku Deployment

1. Install Heroku CLI
2. Create a Heroku app: `heroku create your-app-name`
3. Set environment variables:
   ```bash
   heroku config:set MONGODB_URI=your-mongodb-atlas-uri
   heroku config:set SESSION_SECRET=your-session-secret
   ```
4. Deploy: `git push heroku main`

## API Endpoints

### Public Routes
- `GET /` - Home page with all posts
- `GET /about` - About page
- `GET /contact` - Contact page
- `GET /posts/:id` - View single post
- `GET /users/register` - Registration page
- `GET /users/login` - Login page

### Protected Routes (Authentication Required)
- `GET /posts/new` - New post form
- `POST /posts` - Create new post
- `DELETE /posts/:id` - Delete post (owner only)

### Authentication Routes
- `POST /users/register` - User registration
- `POST /users/login` - User login
- `GET/POST /users/logout` - User logout

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Based on Greg Lim's "Beginning Node.js, Express & MongoDB Development" book
- Uses the Clean Blog Bootstrap theme
- Inspired by modern web development best practices
