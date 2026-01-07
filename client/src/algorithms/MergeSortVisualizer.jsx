import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import '../algorithms/BubbleSortVisualizer.css';

const MergeSortVisualizer = ({ isPlaying, speed, onComplete }) => {
  const [array, setArray] = useState([64, 34, 25, 12, 22, 11, 90, 88, 45, 50]);
  const [comparing, setComparing] = useState([]);
  const [merging, setMerging] = useState([]);
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
        setMerging(step.merging);
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

    const merge = (arr, left, mid, right) => {
      const leftArr = arr.slice(left, mid + 1);
      const rightArr = arr.slice(mid + 1, right + 1);
      
      let i = 0, j = 0, k = left;
      
      while (i < leftArr.length && j < rightArr.length) {
        newSteps.push({
          array: [...arr],
          comparing: [left + i, mid + 1 + j],
          merging: Array.from({length: right - left + 1}, (_, idx) => left + idx),
          sorted: [...sortedIndices],
        });

        if (leftArr[i] <= rightArr[j]) {
          arr[k] = leftArr[i];
          i++;
        } else {
          arr[k] = rightArr[j];
          j++;
        }
        
        newSteps.push({
          array: [...arr],
          comparing: [k],
          merging: Array.from({length: right - left + 1}, (_, idx) => left + idx),
          sorted: [...sortedIndices],
        });
        
        k++;
      }
      
      while (i < leftArr.length) {
        arr[k] = leftArr[i];
        newSteps.push({
          array: [...arr],
          comparing: [k],
          merging: Array.from({length: right - left + 1}, (_, idx) => left + idx),
          sorted: [...sortedIndices],
        });
        i++;
        k++;
      }
      
      while (j < rightArr.length) {
        arr[k] = rightArr[j];
        newSteps.push({
          array: [...arr],
          comparing: [k],
          merging: Array.from({length: right - left + 1}, (_, idx) => left + idx),
          sorted: [...sortedIndices],
        });
        j++;
        k++;
      }
    };

    const mergeSort = (arr, left, right) => {
      if (left < right) {
        const mid = Math.floor((left + right) / 2);
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);
        merge(arr, left, mid, right);
      }
    };

    mergeSort(arr, 0, arr.length - 1);

    for (let i = 0; i < arr.length; i++) {
      sortedIndices.push(i);
    }

    newSteps.push({
      array: [...arr],
      comparing: [],
      merging: [],
      sorted: [...sortedIndices],
    });

    setSteps(newSteps);
  };

  const handleReset = () => {
    setArray([64, 34, 25, 12, 22, 11, 90, 88, 45, 50]);
    setComparing([]);
    setMerging([]);
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
              merging.includes(idx) ? 'merging' :
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

export default MergeSortVisualizer;
