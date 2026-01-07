import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, Clock, Database } from 'lucide-react';
import { algorithms } from '../utils/algorithms';
import './Algorithms.css';

const AlgorithmsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigate = useNavigate();

  const categories = ['All', 'Sorting', 'Searching', 'Graph', 'Data Structure'];

  const filteredAlgorithms = Object.values(algorithms).filter(algo => {
    const matchesSearch = algo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         algo.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || algo.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAlgorithmClick = (algoId) => {
    navigate(`/visualizer?algorithm=${algoId}`);
  };

  return (
    <div className="algorithms-page">
      <motion.div
        className="algorithms-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="page-title gradient-text">Algorithm Library</h1>
        <p className="page-subtitle">
          Explore and learn algorithms with interactive visualizations
        </p>
      </motion.div>

      <motion.div
        className="algorithms-filters glass-effect"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search algorithms..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="category-filters">
          {categories.map((category) => (
            <motion.button
              key={category}
              className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </motion.div>

      <div className="algorithms-grid">
        {filteredAlgorithms.map((algo, index) => (
          <motion.div
            key={algo.id}
            className="algorithm-card glass-effect"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -10 }}
            onClick={() => handleAlgorithmClick(algo.id)}
          >
            <div className="card-header">
              <h3>{algo.name}</h3>
              <span className={`difficulty-badge ${algo.difficulty.toLowerCase()}`}>
                {algo.difficulty}
              </span>
            </div>

            <p className="card-description">{algo.description}</p>

            <div className="card-complexity">
              <div className="complexity-row">
                <Clock size={16} />
                <span className="label">Time:</span>
                <span className="value">{algo.timeComplexity.average}</span>
              </div>
              <div className="complexity-row">
                <Database size={16} />
                <span className="label">Space:</span>
                <span className="value">{algo.spaceComplexity}</span>
              </div>
            </div>

            <div className="card-category">{algo.category}</div>

            <motion.button
              className="card-action-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Visualize →
            </motion.button>
          </motion.div>
        ))}
      </div>

      {filteredAlgorithms.length === 0 && (
        <motion.div
          className="no-results"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p>No algorithms found matching your search.</p>
        </motion.div>
      )}
    </div>
  );
};

export default AlgorithmsPage;
