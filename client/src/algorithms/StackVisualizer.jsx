import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './GraphVisualizer.css';

const StackVisualizer = () => {
  const [stack, setStack] = useState([10, 20, 30]);
  const [inputValue, setInputValue] = useState('');
  const [lastOperation, setLastOperation] = useState('');

  const handlePush = () => {
    if (inputValue && !isNaN(inputValue)) {
      setStack([...stack, parseInt(inputValue)]);
      setLastOperation(`Pushed ${inputValue}`);
      setInputValue('');
    }
  };

  const handlePop = () => {
    if (stack.length > 0) {
      const popped = stack[stack.length - 1];
      setStack(stack.slice(0, -1));
      setLastOperation(`Popped ${popped}`);
    } else {
      setLastOperation('Stack is empty!');
    }
  };

  const handlePeek = () => {
    if (stack.length > 0) {
      setLastOperation(`Top element: ${stack[stack.length - 1]}`);
    } else {
      setLastOperation('Stack is empty!');
    }
  };

  const handleClear = () => {
    setStack([]);
    setLastOperation('Stack cleared');
  };

  return (
    <div className="visualizer-container">
      <div className="data-structure-container">
        <div className="ds-controls">
          <input
            type="number"
            className="ds-input"
            placeholder="Value"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handlePush()}
          />
          <motion.button
            className="ds-button"
            onClick={handlePush}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Push
          </motion.button>
          <motion.button
            className="ds-button"
            onClick={handlePop}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Pop
          </motion.button>
          <motion.button
            className="ds-button"
            onClick={handlePeek}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Peek
          </motion.button>
          <motion.button
            className="ds-button"
            onClick={handleClear}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Clear
          </motion.button>
        </div>

        <div className="ds-visualization" style={{ flexDirection: 'column-reverse', alignItems: 'center' }}>
          <AnimatePresence>
            {stack.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}
              >
                Stack is empty
              </motion.div>
            ) : (
              stack.map((value, idx) => (
                <motion.div
                  key={`${value}-${idx}`}
                  className={`ds-element ${idx === stack.length - 1 ? 'highlighted' : ''}`}
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 50 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    marginBottom: idx === stack.length - 1 ? '1rem' : '0.5rem',
                  }}
                >
                  {value}
                  {idx === stack.length - 1 && (
                    <span style={{
                      position: 'absolute',
                      right: '-60px',
                      color: 'var(--color-warning)',
                      fontSize: '0.9rem',
                      fontWeight: 600
                    }}>
                      ← TOP
                    </span>
                  )}
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        <div className="ds-info">
          <p><strong>Size:</strong> {stack.length}</p>
          <p><strong>Last Operation:</strong> {lastOperation || 'None'}</p>
          <p><strong>Operations:</strong> Push adds to top, Pop removes from top (LIFO - Last In First Out)</p>
        </div>
      </div>
    </div>
  );
};

export default StackVisualizer;
