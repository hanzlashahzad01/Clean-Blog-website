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

# ScreenShots

### User Register Page

<img width="1919" height="1031" alt="register" src="https://github.com/user-attachments/assets/89610eee-56a0-4db3-869b-4e87fab15014" />

<img width="1919" height="936" alt="register1" src="https://github.com/user-attachments/assets/aed39ab9-2423-4ca6-ba66-f7aae825ea0a" />

## Login Page

<img width="1919" height="1032" alt="login" src="https://github.com/user-attachments/assets/72390506-0866-40f4-b96d-00f34d2ee084" />

<img width="1919" height="1028" alt="login1" src="https://github.com/user-attachments/assets/a86fac9d-f007-48cb-9b9f-33e899c575fa" />

## Home Page

<img width="1919" height="1029" alt="home" src="https://github.com/user-attachments/assets/11fd2b2c-58a3-4083-b763-5187f0f1f6eb" />

<img width="1919" height="1031" alt="home1" src="https://github.com/user-attachments/assets/1ab09c4b-f5ef-4a05-ab8e-aa230ed227d2" />

### Add New Post

<img width="1919" height="1033" alt="aad new post" src="https://github.com/user-attachments/assets/90c274e1-aa5c-4161-aa0f-2b7c277d68f9" />

<img width="1919" height="1034" alt="add poste1" src="https://github.com/user-attachments/assets/000b39ad-112b-4daf-a8b9-bd46fdbfc255" />

## About Page

<img width="1919" height="1035" alt="about" src="https://github.com/user-attachments/assets/ea808fec-38ba-4fb2-9156-27a0d949e9f4" />

<img width="1919" height="1032" alt="about1" src="https://github.com/user-attachments/assets/158350d3-c780-4b80-acb6-3d8a25d9af9f" />

## Contact Page

<img width="1919" height="1031" alt="contact" src="https://github.com/user-attachments/assets/74e3f13e-2e1f-419a-96c8-75d463c01df7" />

<img width="1919" height="1032" alt="contact1" src="https://github.com/user-attachments/assets/eb46adc8-33c3-4286-ab74-ee2ee8ec1b9d" />

