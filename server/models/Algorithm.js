import mongoose from 'mongoose';

const algorithmSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['Sorting', 'Searching', 'Graph', 'Data Structure', 'Dynamic Programming'],
  },
  difficulty: {
    type: String,
    required: true,
    enum: ['Easy', 'Medium', 'Hard'],
  },
  description: {
    type: String,
    required: true,
  },
  timeComplexity: {
    best: String,
    average: String,
    worst: String,
  },
  spaceComplexity: String,
  implementations: {
    python: String,
    java: String,
    cpp: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Algorithm = mongoose.model('Algorithm', algorithmSchema);

export default Algorithm;
