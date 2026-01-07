import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './GraphVisualizer.css';

const QueueVisualizer = () => {
  const [queue, setQueue] = useState([10, 20, 30]);
  const [inputValue, setInputValue] = useState('');
  const [lastOperation, setLastOperation] = useState('');

  const handleEnqueue = () => {
    if (inputValue && !isNaN(inputValue)) {
      setQueue([...queue, parseInt(inputValue)]);
      setLastOperation(`Enqueued ${inputValue}`);
      setInputValue('');
    }
  };

  const handleDequeue = () => {
    if (queue.length > 0) {
      const dequeued = queue[0];
      setQueue(queue.slice(1));
      setLastOperation(`Dequeued ${dequeued}`);
    } else {
      setLastOperation('Queue is empty!');
    }
  };

  const handleFront = () => {
    if (queue.length > 0) {
      setLastOperation(`Front element: ${queue[0]}`);
    } else {
      setLastOperation('Queue is empty!');
    }
  };

  const handleClear = () => {
    setQueue([]);
    setLastOperation('Queue cleared');
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
            onKeyPress={(e) => e.key === 'Enter' && handleEnqueue()}
          />
          <motion.button
            className="ds-button"
            onClick={handleEnqueue}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Enqueue
          </motion.button>
          <motion.button
            className="ds-button"
            onClick={handleDequeue}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Dequeue
          </motion.button>
          <motion.button
            className="ds-button"
            onClick={handleFront}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Front
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

        <div className="ds-visualization" style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <div style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            color: 'var(--color-success)',
            fontSize: '0.9rem',
            fontWeight: 600
          }}>
            FRONT →
          </div>
          <div style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            color: 'var(--color-warning)',
            fontSize: '0.9rem',
            fontWeight: 600
          }}>
            ← REAR
          </div>
          
          <AnimatePresence>
            {queue.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}
              >
                Queue is empty
              </motion.div>
            ) : (
              queue.map((value, idx) => (
                <motion.div
                  key={`${value}-${idx}`}
                  className={`ds-element ${idx === 0 ? 'highlighted' : ''}`}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    marginRight: idx < queue.length - 1 ? '1rem' : '0',
                  }}
                >
                  {value}
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        <div className="ds-info">
          <p><strong>Size:</strong> {queue.length}</p>
          <p><strong>Last Operation:</strong> {lastOperation || 'None'}</p>
          <p><strong>Operations:</strong> Enqueue adds to rear, Dequeue removes from front (FIFO - First In First Out)</p>
        </div>
      </div>
    </div>
  );
};

export default QueueVisualizer;
