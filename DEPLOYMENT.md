# Deployment Guide

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/clean-blog

# Session Secret (change this to a random string in production)
SESSION_SECRET=your-super-secret-session-key-here

# Server Port
PORT=3000
```

## Local Development Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start MongoDB**
   - Install MongoDB locally or use Docker
   - Start MongoDB service: `mongod`

3. **Create Environment File**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Run the Application**
   ```bash
   npm run dev  # Development with auto-restart
   # or
   npm start    # Production mode
   ```

5. **Access the Application**
   Open your browser and go to `http://localhost:3000`

## MongoDB Atlas Setup

1. **Create MongoDB Atlas Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Create a free account

2. **Create a Cluster**
   - Click "Build a Database"
   - Choose the free tier (M0)
   - Select your preferred region

3. **Configure Database Access**
   - Go to "Database Access"
   - Create a new database user
   - Set username and password
   - Grant read/write permissions

4. **Configure Network Access**
   - Go to "Network Access"
   - Add IP address (0.0.0.0/0 for all IPs or your specific IP)

5. **Get Connection String**
   - Go to "Database"
   - Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password

6. **Update Environment Variables**
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/clean-blog?retryWrites=true&w=majority
   ```

## Heroku Deployment

1. **Install Heroku CLI**
   - Download from [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)

2. **Login to Heroku**
   ```bash
   heroku login
   ```

3. **Create Heroku App**
   ```bash
   heroku create your-app-name
   ```

4. **Set Environment Variables**
   ```bash
   heroku config:set MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/clean-blog?retryWrites=true&w=majority
   heroku config:set SESSION_SECRET=your-super-secret-session-key-here
   heroku config:set NODE_ENV=production
   ```

5. **Deploy**
   ```bash
   git add .
   git commit -m "Initial deployment"
   git push heroku main
   ```

6. **Open Application**
   ```bash
   heroku open
   ```

## Render Deployment

1. **Create Render Account**
   - Go to [Render](https://render.com)
   - Sign up for free account

2. **Connect Repository**
   - Connect your GitHub repository
   - Choose "Web Service"

3. **Configure Build Settings**
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Environment: `Node`

4. **Set Environment Variables**
   - MONGODB_URI: Your MongoDB Atlas connection string
   - SESSION_SECRET: Random secret string
   - NODE_ENV: production

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment to complete

## Production Checklist

- [ ] Change SESSION_SECRET to a secure random string
- [ ] Use MongoDB Atlas or production MongoDB instance
- [ ] Set NODE_ENV=production
- [ ] Configure proper CORS if needed
- [ ] Set up SSL/HTTPS
- [ ] Configure proper logging
- [ ] Set up monitoring and error tracking
- [ ] Configure backup strategy for MongoDB
- [ ] Test all functionality in production environment

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Check if MongoDB is running
   - Verify connection string
   - Check network access settings in MongoDB Atlas

2. **Session Issues**
   - Ensure SESSION_SECRET is set
   - Check if sessions are properly configured

3. **Image Upload Issues**
   - Check file permissions
   - Verify upload directory exists
   - Check file size limits

4. **Authentication Issues**
   - Verify bcrypt installation
   - Check password hashing
   - Ensure session middleware is configured

### Logs

Check application logs for detailed error information:
- Heroku: `heroku logs --tail`
- Render: Check the logs section in dashboard
- Local: Check console output
