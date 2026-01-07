import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import '../algorithms/BubbleSortVisualizer.css';

const QuickSortVisualizer = ({ isPlaying, speed, onComplete }) => {
  const [array, setArray] = useState([64, 34, 25, 12, 22, 11, 90, 88, 45, 50]);
  const [comparing, setComparing] = useState([]);
  const [pivot, setPivot] = useState(-1);
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
        setPivot(step.pivot);
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
    const sortedIndices = [];

    const partition = (arr, low, high) => {
      const pivot = arr[high];
      let i = low - 1;

      for (let j = low; j < high; j++) {
        newSteps.push({
          array: [...arr],
          comparing: [j, high],
          pivot: high,
          sorted: [...sortedIndices],
        });

        if (arr[j] < pivot) {
          i++;
          [arr[i], arr[j]] = [arr[j], arr[i]];
          newSteps.push({
            array: [...arr],
            comparing: [i, j],
            pivot: high,
            sorted: [...sortedIndices],
          });
        }
      }

      [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
      newSteps.push({
        array: [...arr],
        comparing: [i + 1, high],
        pivot: i + 1,
        sorted: [...sortedIndices],
      });

      sortedIndices.push(i + 1);
      return i + 1;
    };

    const quickSort = (arr, low, high) => {
      if (low < high) {
        const pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
      } else if (low === high) {
        sortedIndices.push(low);
      }
    };

    quickSort(arr, 0, arr.length - 1);

    for (let i = 0; i < arr.length; i++) {
      if (!sortedIndices.includes(i)) {
        sortedIndices.push(i);
      }
    }

    newSteps.push({
      array: [...arr],
      comparing: [],
      pivot: -1,
      sorted: [...sortedIndices],
    });

    setSteps(newSteps);
  };

  const handleReset = () => {
    setArray([64, 34, 25, 12, 22, 11, 90, 88, 45, 50]);
    setComparing([]);
    setPivot(-1);
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
              pivot === idx ? 'pivot' :
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

export default QuickSortVisualizer;
