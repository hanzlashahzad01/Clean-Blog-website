#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 Clean Blog Setup Script');
console.log('==========================\n');

// Check if .env file exists
const envPath = path.join(__dirname, '.env');
if (!fs.existsSync(envPath)) {
    console.log('📝 Creating .env file...');
    const envContent = `# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/clean-blog

# Session Secret (change this to a random string in production)
SESSION_SECRET=your-super-secret-session-key-${Math.random().toString(36).substring(2, 15)}

# Server Port
PORT=3000

# For production deployment (MongoDB Atlas example)
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/clean-blog?retryWrites=true&w=majority
`;
    
    fs.writeFileSync(envPath, envContent);
    console.log('✅ .env file created successfully!\n');
} else {
    console.log('✅ .env file already exists\n');
}

// Check if uploads directory exists
const uploadsDir = path.join(__dirname, 'public', 'img', 'uploads');
if (!fs.existsSync(uploadsDir)) {
    console.log('📁 Creating uploads directory...');
    fs.mkdirSync(uploadsDir, { recursive: true });
    console.log('✅ Uploads directory created successfully!\n');
} else {
    console.log('✅ Uploads directory already exists\n');
}

console.log('🎉 Setup completed successfully!');
console.log('\nNext steps:');
console.log('1. Make sure MongoDB is running on your system');
console.log('2. Run: npm install');
console.log('3. Run: npm run dev');
console.log('4. Open: http://localhost:3000');
console.log('\nFor deployment instructions, see DEPLOYMENT.md');
