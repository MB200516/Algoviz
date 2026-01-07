import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Code2 } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  return (
    <motion.nav 
      className="navbar glass-effect"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <Code2 size={32} />
          <span className="gradient-text">ALGOVIZ</span>
        </Link>

        <div className="navbar-links">
          <Link to="/visualizer" className="nav-link">
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Visualizer
            </motion.span>
          </Link>
          <Link to="/algorithms" className="nav-link">
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Algorithms
            </motion.span>
          </Link>
          <Link to="/playground" className="nav-link">
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Playground
            </motion.span>
          </Link>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
