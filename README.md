# DSA Nexus - Algorithm Visualizer

A production-level Data Structures and Algorithms visualizer with real-time code execution, modern UI, and comprehensive learning features.

## Features

- **Interactive Algorithm Visualizations**: Watch sorting, searching, and graph algorithms come to life
- **Multi-Language Code Editor**: Write and execute Python, Java, and C++ code in real-time
- **User Authentication**: Secure login and registration system
- **Modern Luxury UI**: Sleek gradient-based design with smooth animations
- **Comprehensive Algorithm Library**: 10+ algorithms with descriptions and complexity analysis
- **Real-Time Execution**: Execute code directly in the browser with instant feedback

## Tech Stack

### Frontend
- React 18 with Vite
- Framer Motion for animations
- CodeMirror for code editing
- Zustand for state management
- React Router for navigation
- Axios for API calls

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT authentication
- Bcrypt for password hashing
- Code execution support for Python, Java, C++

## Prerequisites

Before running this application, ensure you have the following installed:

- Node.js (v16 or higher)
- MongoDB (v5 or higher)
- Python 3
- Java JDK
- GCC/G++ compiler

## Installation & Setup

### 1. Clone the Repository

```bash
cd dsa-visualizer
```

### 2. Database Setup

**Option A: Local MongoDB**

1. Install MongoDB from https://www.mongodb.com/try/download/community
2. Start MongoDB service:
   ```bash
   # On macOS with Homebrew
   brew services start mongodb-community
   
   # On Linux
   sudo systemctl start mongod
   
   # On Windows
   net start MongoDB
   ```

**Option B: MongoDB Atlas (Cloud)**

1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a cluster and get connection string
3. Update `server/.env` with your connection string

### 3. Server Setup

```bash
cd server

# Install dependencies
npm install

# Create .env file (already created, update if needed)
# The file should contain:
# PORT=5000
# MONGODB_URI=mongodb://localhost:27017/dsa-visualizer
# JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
# NODE_ENV=development

# Seed the database with initial algorithms
node database/seed.js

# Start the server
npm run dev
```

The server will start on http://localhost:5000

### 4. Client Setup

Open a new terminal window:

```bash
cd client

# Install dependencies
npm install

# Start the development server
npm run dev
```

The client will start on http://localhost:3000

## Running the Application

1. Make sure MongoDB is running
2. Start the backend server: `cd server && npm run dev`
3. Start the frontend client: `cd client && npm run dev`
4. Open http://localhost:3000 in your browser

## Project Structure

```
dsa-visualizer/
├── client/                    # Frontend React application
│   ├── src/
│   │   ├── algorithms/       # Algorithm visualizer components
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── store/           # Zustand state management
│   │   ├── styles/          # Global styles
│   │   ├── utils/           # Utility functions
│   │   ├── App.jsx          # Main app component
│   │   └── main.jsx         # Entry point
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── server/                   # Backend Node.js application
│   ├── controllers/         # Request handlers
│   ├── middleware/          # Custom middleware
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── utils/              # Utility functions
│   ├── .env                # Environment variables
│   ├── server.js           # Server entry point
│   └── package.json
│
└── database/               # Database scripts
    └── seed.js            # Database seeding script
```

## Available Scripts

### Client

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Server

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Code Execution
- `POST /api/code/execute` - Execute code (protected)

## Features Overview

### 1. User Authentication
- Secure registration and login
- JWT-based authentication
- Password hashing with bcrypt
- Protected routes

### 2. Algorithm Visualizer
- Real-time visualization of algorithms
- Step-by-step execution
- Adjustable animation speed
- Multiple algorithm categories

### 3. Code Playground
- Multi-language support (Python, Java, C++)
- Syntax highlighting
- Real-time code execution
- Download code functionality

### 4. Algorithm Library
- Detailed algorithm descriptions
- Time and space complexity analysis
- Real-world applications
- Code templates in multiple languages

## Algorithms Included

### Sorting Algorithms
- Bubble Sort
- Quick Sort
- Merge Sort

### Searching Algorithms
- Linear Search
- Binary Search

### Graph Algorithms
- Breadth-First Search (BFS)
- Depth-First Search (DFS)
- Dijkstra's Algorithm

### Data Structures
- Stack Operations
- Queue Operations

## Environment Variables

### Server (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/dsa-visualizer
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
```

## Security Considerations

- JWT tokens for authentication
- Password hashing with bcrypt
- Protected API routes
- CORS configuration
- Input validation
- Secure code execution

## Performance Optimization

- Code splitting with React lazy loading
- Optimized animations with Framer Motion
- Efficient state management with Zustand
- MongoDB indexing
- Request caching

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check connection string in .env
- Verify network settings

### Code Execution Issues
- Ensure Python, Java, and GCC are installed
- Check system PATH variables
- Verify compiler versions

### Port Already in Use
- Kill process on port 3000 or 5000
- Change ports in configuration files

## Contributing

This is a demonstration project. For production use:
1. Update JWT secret
2. Configure production database
3. Add rate limiting
4. Implement proper error logging
5. Add comprehensive testing

## License

MIT License - Feel free to use for learning and demonstration purposes.

## Contact

For questions or issues, please open an issue on the repository.
