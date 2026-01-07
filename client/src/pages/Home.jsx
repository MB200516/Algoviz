import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Code2, Zap, Brain, Play, ArrowRight } from 'lucide-react';
import './Home.css';

const Home = () => {
  const features = [
    {
      icon: <Code2 size={32} />,
      title: 'Interactive Visualizations',
      description: 'Watch algorithms come to life with stunning real-time animations'
    },
    {
      icon: <Zap size={32} />,
      title: 'Multi-Language Support',
      description: 'Write and execute code in Python, Java, and C++'
    },
    {
      icon: <Brain size={32} />,
      title: 'Comprehensive Library',
      description: 'Explore sorting, searching, graph algorithms and data structures'
    }
  ];

  return (
    <div className="home-container">
      <section className="hero-section">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Visualize Algorithms <span className="gradient-text">Beautifully</span>
            <br />
            Learn Faster, Code Better
          </motion.h1>

          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Master data structures and algorithms through interactive visualizations,
            real-time code execution, and immersive learning experiences.
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Link to="/visualizer">
              <motion.button
                className="btn-hero-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Visualizing
                <ArrowRight size={20} />
              </motion.button>
            </Link>

            <Link to="/algorithms">
              <motion.button
                className="btn-hero-secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Play size={20} />
                Browse Algorithms
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
        >
          <div className="floating-card card-1">
            <div className="card-code">
              <span className="code-keyword">function</span>{' '}
              <span className="code-function">quickSort</span>()
            </div>
          </div>
          <div className="floating-card card-2">
            <div className="card-stat">
              <span className="stat-label">Time Complexity</span>
              <span className="stat-value">O(n log n)</span>
            </div>
          </div>
          <div className="floating-card card-3">
            <div className="card-graph">
              <div className="graph-bar" style={{ height: '40%' }}></div>
              <div className="graph-bar" style={{ height: '70%' }}></div>
              <div className="graph-bar" style={{ height: '50%' }}></div>
              <div className="graph-bar" style={{ height: '90%' }}></div>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="features-section">
        <motion.h2
          className="section-title gradient-text"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          All Your Learning Needs in a Single Free Platform
        </motion.h2>

        <div className="features-grid">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="feature-card glass-effect"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              whileHover={{ y: -10 }}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
