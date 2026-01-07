import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './utils/db.js';
import authRoutes from './routes/authRoutes.js';
import codeRoutes from './routes/codeRoutes.js';

dotenv.config();

const app = express();

//connectDB();

app.use(cors({
  origin: '*',  // Allow all origins (not recommended for production)
  credentials: false
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/code', codeRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'DSA Visualizer API is running' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
