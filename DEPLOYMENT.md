# DSA Nexus - Deployment Guide

## Quick Start (Recommended)

### Option 1: Automatic Setup (Linux/Mac)
```bash
cd dsa-visualizer
chmod +x start.sh
./start.sh
```

### Option 2: Automatic Setup (Windows)
```bash
cd dsa-visualizer
start.bat
```

### Option 3: Manual Setup

#### Step 1: Install Prerequisites
- Node.js v16+ (https://nodejs.org)
- MongoDB v5+ (https://www.mongodb.com/try/download/community)
- Python 3 (https://www.python.org/downloads/)
- Java JDK 11+ (https://adoptium.net/)
- GCC/G++ (comes with Xcode on Mac, MinGW on Windows, build-essential on Linux)

#### Step 2: Start MongoDB
**Mac:**
```bash
brew services start mongodb-community
```

**Linux:**
```bash
sudo systemctl start mongod
```

**Windows:**
```bash
net start MongoDB
```

#### Step 3: Setup Backend
```bash
cd server
npm install
node ../database/seed.js
npm run dev
```

#### Step 4: Setup Frontend (New Terminal)
```bash
cd client
npm install
npm run dev
```

#### Step 5: Access Application
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## Docker Deployment

```bash
docker-compose up -d
```

This will start:
- MongoDB on port 27017
- Backend on port 5000
- Frontend on port 3000

## Production Deployment

### 1. Update Environment Variables
Edit `server/.env`:
```
PORT=5000
MONGODB_URI=your-production-mongodb-uri
JWT_SECRET=generate-strong-random-secret
NODE_ENV=production
```

### 2. Build Frontend
```bash
cd client
npm run build
```

### 3. Serve Static Files
Configure your web server (Nginx, Apache) to serve the `client/dist` folder.

### 4. Deploy Backend
```bash
cd server
npm start
```

## Environment Variables Explained

### Backend (server/.env)
- `PORT`: Server port (default: 5000)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT tokens (MUST be changed in production)
- `NODE_ENV`: Environment (development/production)

## Troubleshooting

### "MongoDB connection error"
- Ensure MongoDB is running
- Check connection string in .env
- Verify MongoDB is listening on port 27017

### "Port 3000 already in use"
1. Find process: `lsof -i :3000` (Mac/Linux) or `netstat -ano | findstr :3000` (Windows)
2. Kill process: `kill -9 <PID>` (Mac/Linux) or `taskkill /PID <PID> /F` (Windows)

### "Code execution failed"
- Verify Python is in PATH: `python3 --version`
- Verify Java is in PATH: `java -version`
- Verify GCC is in PATH: `g++ --version`

### "Cannot find module"
```bash
cd client && npm install
cd ../server && npm install
```

## Features Usage

### 1. Create Account
1. Navigate to http://localhost:3000
2. Click "Sign Up"
3. Enter name, email, password
4. Click "Sign Up"

### 2. Visualize Algorithms
1. Login to your account
2. Navigate to "Visualizer"
3. Select an algorithm from dropdown
4. Click Play button to start visualization
5. Adjust speed with slider

### 3. Code Playground
1. Navigate to "Playground"
2. Select language (Python/Java/C++)
3. Write or modify code
4. Click "Run Code" to execute
5. View output below editor

### 4. Learn Algorithms
1. Navigate to "Algorithms"
2. Browse algorithm categories
3. Read descriptions and complexity analysis
4. View code implementations
5. Study real-world applications

## Project Architecture

```
Frontend (React) ←→ Backend (Express) ←→ Database (MongoDB)
     ↓                    ↓
  Vite Build      Code Execution Engine
                  (Python/Java/C++)
```

## Security Notes

For Production:
1. Change JWT_SECRET to a strong random string
2. Enable HTTPS
3. Add rate limiting
4. Implement request validation
5. Add CORS whitelist
6. Use environment-specific configs
7. Enable MongoDB authentication
8. Add API request logging

## Performance Tips

1. Enable production build: `npm run build`
2. Use CDN for static assets
3. Implement caching strategies
4. Optimize MongoDB queries with indexes
5. Use compression middleware
6. Implement lazy loading for components

## Monitoring

Monitor these metrics in production:
- API response times
- Database query performance
- Code execution times
- User authentication success rate
- Error rates and types

## Backup Strategy

1. Database backups:
```bash
mongodump --db dsa-visualizer --out /backup/location
```

2. Code backups:
- Use Git for version control
- Regular commits to remote repository

## Scaling

For high traffic:
1. Use load balancer (Nginx)
2. Deploy multiple backend instances
3. Use Redis for session management
4. Implement caching (Redis/Memcached)
5. Use MongoDB replica sets
6. Consider CDN for static assets

## Support

For issues or questions:
1. Check troubleshooting section above
2. Review console logs (F12 in browser)
3. Check server logs in terminal
4. Verify all dependencies are installed
5. Ensure all services are running

## Updates

To update the application:
```bash
git pull origin main
cd client && npm install
cd ../server && npm install
```

## License

MIT License - Free to use and modify
