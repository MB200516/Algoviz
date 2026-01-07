import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './BubbleSortVisualizer.css';

const BubbleSortVisualizer = ({ isPlaying, speed, onComplete }) => {
  const [array, setArray] = useState([64, 34, 25, 12, 22, 11, 90, 88, 45, 50]);
  const [comparing, setComparing] = useState([]);
  const [sorted, setSorted] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState([]);

  useEffect(() => {
    generateSteps();
  }, []);

  useEffect(() => {
    if (isPlaying && currentStep < steps.length) {
      const timer = setTimeout(() => {
        const step = steps[currentStep];
        setArray(step.array);
        setComparing(step.comparing);
        setSorted(step.sorted);
        setCurrentStep(currentStep + 1);
      }, speed);

      return () => clearTimeout(timer);
    } else if (currentStep >= steps.length && isPlaying) {
      onComplete?.();
    }
  }, [isPlaying, currentStep, speed, steps]);

  const generateSteps = () => {
    const arr = [...array];
    const newSteps = [];
    const n = arr.length;
    const sortedIndices = [];

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        newSteps.push({
          array: [...arr],
          comparing: [j, j + 1],
          sorted: [...sortedIndices],
        });

        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          newSteps.push({
            array: [...arr],
            comparing: [j, j + 1],
            sorted: [...sortedIndices],
          });
        }
      }
      sortedIndices.push(n - i - 1);
    }

    newSteps.push({
      array: [...arr],
      comparing: [],
      sorted: [...sortedIndices],
    });

    setSteps(newSteps);
  };

  const handleReset = () => {
    setArray([64, 34, 25, 12, 22, 11, 90, 88, 45, 50]);
    setComparing([]);
    setSorted([]);
    setCurrentStep(0);
    generateSteps();
  };

  const maxValue = Math.max(...array);

  return (
    <div className="visualizer-container">
      <div className="array-container">
        {array.map((value, idx) => (
          <motion.div
            key={idx}
            className={`array-bar ${
              comparing.includes(idx) ? 'comparing' :
              sorted.includes(idx) ? 'sorted' : ''
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
        </div>
      </div>
    </div>
  );
};

export default BubbleSortVisualizer;
