import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import '../algorithms/BubbleSortVisualizer.css';

const BinarySearchVisualizer = ({ isPlaying, speed, onComplete }) => {
  const [array, setArray] = useState([11, 12, 22, 25, 34, 45, 50, 64, 88, 90]);
  const [target, setTarget] = useState(45);
  const [left, setLeft] = useState(-1);
  const [right, setRight] = useState(-1);
  const [mid, setMid] = useState(-1);
  const [found, setFound] = useState(-1);
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState([]);
  const [searchRange, setSearchRange] = useState([]);

  useEffect(() => {
    generateSteps();
  }, [target]);

  useEffect(() => {
    if (isPlaying && currentStep < steps.length) {
      const timer = setTimeout(() => {
        const step = steps[currentStep];
        setLeft(step.left);
        setRight(step.right);
        setMid(step.mid);
        setFound(step.found);
        setSearchRange(step.searchRange);
        setCurrentStep(currentStep + 1);
      }, speed);

      return () => clearTimeout(timer);
    } else if (currentStep >= steps.length && isPlaying) {
      onComplete?.();
    }
  }, [isPlaying, currentStep, speed, steps]);

  const generateSteps = () => {
    const newSteps = [];
    let l = 0;
    let r = array.length - 1;
    let foundIndex = -1;

    while (l <= r) {
      const m = Math.floor((l + r) / 2);
      const range = Array.from({length: r - l + 1}, (_, i) => l + i);

      newSteps.push({
        left: l,
        right: r,
        mid: m,
        found: -1,
        searchRange: range,
      });

      if (array[m] === target) {
        foundIndex = m;
        newSteps.push({
          left: l,
          right: r,
          mid: m,
          found: m,
          searchRange: [],
        });
        break;
      }

      if (array[m] < target) {
        l = m + 1;
      } else {
        r = m - 1;
      }
    }

    if (foundIndex === -1) {
      newSteps.push({
        left: -1,
        right: -1,
        mid: -1,
        found: -1,
        searchRange: [],
      });
    }

    setSteps(newSteps);
  };

  const handleReset = () => {
    setLeft(-1);
    setRight(-1);
    setMid(-1);
    setFound(-1);
    setSearchRange([]);
    setCurrentStep(0);
    generateSteps();
  };

  const handleTargetChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      setTarget(value);
      setCurrentStep(0);
    }
  };

  const maxValue = Math.max(...array);

  return (
    <div className="visualizer-container">
      <div className="search-controls" style={{ marginBottom: '1rem', textAlign: 'center' }}>
        <label style={{ marginRight: '1rem', color: 'var(--text-primary)' }}>
          Search for: 
          <input
            type="number"
            value={target}
            onChange={handleTargetChange}
            style={{
              marginLeft: '0.5rem',
              padding: '0.5rem',
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              color: 'var(--text-primary)',
              width: '80px'
            }}
          />
        </label>
      </div>

      <div className="array-container">
        {array.map((value, idx) => (
          <motion.div
            key={idx}
            className={`array-bar ${
              found === idx ? 'sorted' :
              mid === idx ? 'comparing' :
              searchRange.includes(idx) ? 'merging' : ''
            }`}
            style={{
              height: `${(value / maxValue) * 100}%`,
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
          >
            <span className="bar-value">{value}</span>
          </motion.div>
        ))}
      </div>

      <div className="visualizer-controls">
        <motion.button
          className="control-btn"
          onClick={handleReset}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Reset
        </motion.button>
        <div className="step-counter">
          Step: {currentStep} / {steps.length}
          {found !== -1 && ` - Found at index ${found}!`}
          {currentStep === steps.length && found === -1 && ' - Not found'}
        </div>
      </div>
    </div>
  );
};

export default BinarySearchVisualizer;
