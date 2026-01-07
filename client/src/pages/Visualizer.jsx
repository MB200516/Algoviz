import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, Settings } from 'lucide-react';
import BubbleSortVisualizer from '../algorithms/BubbleSortVisualizer';
import QuickSortVisualizer from '../algorithms/QuickSortVisualizer';
import MergeSortVisualizer from '../algorithms/MergeSortVisualizer';
import BinarySearchVisualizer from '../algorithms/BinarySearchVisualizer';
import LinearSearchVisualizer from '../algorithms/LinearSearchVisualizer';
import BFSVisualizer from '../algorithms/BFSVisualizer';
import DFSVisualizer from '../algorithms/DFSVisualizer';
import DijkstraVisualizer from '../algorithms/DijkstraVisualizer';
import StackVisualizer from '../algorithms/StackVisualizer';
import QueueVisualizer from '../algorithms/QueueVisualizer';
import CodeEditor from '../components/CodeEditor';
import { algorithms, codeTemplates } from '../utils/algorithms';
import { useVisualizerStore } from '../store/store';
import './Visualizer.css';

const Visualizer = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('bubble-sort');
  const [language, setLanguage] = useState('python');
  const { isPlaying, speed, setIsPlaying, setSpeed } = useVisualizerStore();

  const algorithm = algorithms[selectedAlgorithm];
  const code = codeTemplates[selectedAlgorithm]?.[language] || '';

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="visualizer-page">
      <div className="visualizer-header">
        <motion.h1
          className="page-title gradient-text"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Algorithm Visualizer
        </motion.h1>
        
        <div className="algorithm-selector glass-effect">
          <select
            value={selectedAlgorithm}
            onChange={(e) => setSelectedAlgorithm(e.target.value)}
            className="algorithm-select"
          >
            {Object.values(algorithms).map((algo) => (
              <option key={algo.id} value={algo.id}>
                {algo.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="visualizer-content">
        <div className="visualizer-main">
          <motion.div
            className="algorithm-info glass-effect"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="info-header">
              <h2>{algorithm.name}</h2>
              <span className={`difficulty-badge ${algorithm.difficulty.toLowerCase()}`}>
                {algorithm.difficulty}
              </span>
            </div>
            
            <p className="algorithm-description">{algorithm.description}</p>
            
            <div className="complexity-info">
              <div className="complexity-item">
                <span className="complexity-label">Time Complexity</span>
                <div className="complexity-values">
                  <span>Best: {algorithm.timeComplexity.best}</span>
                  <span>Avg: {algorithm.timeComplexity.average}</span>
                  <span>Worst: {algorithm.timeComplexity.worst}</span>
                </div>
              </div>
              
              <div className="complexity-item">
                <span className="complexity-label">Space Complexity</span>
                <span className="complexity-value">{algorithm.spaceComplexity}</span>
              </div>
            </div>

            <div className="applications">
              <h3>Applications</h3>
              <ul>
                {algorithm.applications.map((app, idx) => (
                  <li key={idx}>{app}</li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div
            className="visualization-panel glass-effect"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {!['stack', 'queue'].includes(selectedAlgorithm) && (
              <div className="panel-controls">
                <motion.button
                  className="control-icon-btn"
                  onClick={handlePlayPause}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                </motion.button>

                <div className="speed-control">
                  <Settings size={20} />
                  <input
                    type="range"
                    min="100"
                    max="1000"
                    step="100"
                    value={speed}
                    onChange={(e) => setSpeed(Number(e.target.value))}
                    className="speed-slider"
                  />
                  <span className="speed-label">{speed}ms</span>
                </div>
              </div>
            )}

            {selectedAlgorithm === 'bubble-sort' && (
              <BubbleSortVisualizer
                isPlaying={isPlaying}
                speed={speed}
                onComplete={() => setIsPlaying(false)}
              />
            )}
            {selectedAlgorithm === 'quick-sort' && (
              <QuickSortVisualizer
                isPlaying={isPlaying}
                speed={speed}
                onComplete={() => setIsPlaying(false)}
              />
            )}
            {selectedAlgorithm === 'merge-sort' && (
              <MergeSortVisualizer
                isPlaying={isPlaying}
                speed={speed}
                onComplete={() => setIsPlaying(false)}
              />
            )}
            {selectedAlgorithm === 'binary-search' && (
              <BinarySearchVisualizer
                isPlaying={isPlaying}
                speed={speed}
                onComplete={() => setIsPlaying(false)}
              />
            )}
            {selectedAlgorithm === 'linear-search' && (
              <LinearSearchVisualizer
                isPlaying={isPlaying}
                speed={speed}
                onComplete={() => setIsPlaying(false)}
              />
            )}
            {selectedAlgorithm === 'bfs' && (
              <BFSVisualizer
                isPlaying={isPlaying}
                speed={speed}
                onComplete={() => setIsPlaying(false)}
              />
            )}
            {selectedAlgorithm === 'dfs' && (
              <DFSVisualizer
                isPlaying={isPlaying}
                speed={speed}
                onComplete={() => setIsPlaying(false)}
              />
            )}
            {selectedAlgorithm === 'dijkstra' && (
              <DijkstraVisualizer
                isPlaying={isPlaying}
                speed={speed}
                onComplete={() => setIsPlaying(false)}
              />
            )}
            {selectedAlgorithm === 'stack' && (
              <StackVisualizer />
            )}
            {selectedAlgorithm === 'queue' && (
              <QueueVisualizer />
            )}
          </motion.div>
        </div>

        <motion.div
          className="code-panel"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="language-tabs">
            {['python', 'java', 'cpp'].map((lang) => (
              <button
                key={lang}
                className={`language-tab ${language === lang ? 'active' : ''}`}
                onClick={() => setLanguage(lang)}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
          
          <CodeEditor initialCode={code} language={language} />
        </motion.div>
      </div>
    </div>
  );
};

export default Visualizer;
