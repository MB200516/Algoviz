import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import '../algorithms/BubbleSortVisualizer.css';

const LinearSearchVisualizer = ({ isPlaying, speed, onComplete }) => {
  const [array, setArray] = useState([64, 34, 25, 12, 22, 11, 90, 88, 45, 50]);
  const [target, setTarget] = useState(22);
  const [checking, setChecking] = useState(-1);
  const [found, setFound] = useState(-1);
  const [checked, setChecked] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState([]);

  useEffect(() => {
    generateSteps();
  }, [target]);

  useEffect(() => {
    if (isPlaying && currentStep < steps.length) {
      const timer = setTimeout(() => {
        const step = steps[currentStep];
        setChecking(step.checking);
        setFound(step.found);
        setChecked(step.checked);
        setCurrentStep(currentStep + 1);
      }, speed);

      return () => clearTimeout(timer);
    } else if (currentStep >= steps.length && isPlaying) {
      onComplete?.();
    }
  }, [isPlaying, currentStep, speed, steps]);

  const generateSteps = () => {
    const newSteps = [];
    const checkedIndices = [];
    let foundIndex = -1;

    for (let i = 0; i < array.length; i++) {
      newSteps.push({
        checking: i,
        found: -1,
        checked: [...checkedIndices],
      });

      checkedIndices.push(i);

      if (array[i] === target) {
        foundIndex = i;
        newSteps.push({
          checking: -1,
          found: i,
          checked: [...checkedIndices],
        });
        break;
      }
    }

    if (foundIndex === -1) {
      newSteps.push({
        checking: -1,
        found: -1,
        checked: [...checkedIndices],
      });
    }

    setSteps(newSteps);
  };

  const handleReset = () => {
    setChecking(-1);
    setFound(-1);
    setChecked([]);
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
              checking === idx ? 'comparing' :
              checked.includes(idx) ? 'merging' : ''
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

export default LinearSearchVisualizer;
