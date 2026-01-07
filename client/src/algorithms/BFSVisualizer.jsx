import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './GraphVisualizer.css';

const BFSVisualizer = ({ isPlaying, speed, onComplete }) => {
  const [nodes] = useState([
    { id: 0, x: 250, y: 50, label: 'A' },
    { id: 1, x: 150, y: 150, label: 'B' },
    { id: 2, x: 350, y: 150, label: 'C' },
    { id: 3, x: 100, y: 250, label: 'D' },
    { id: 4, x: 200, y: 250, label: 'E' },
    { id: 5, x: 300, y: 250, label: 'F' },
    { id: 6, x: 400, y: 250, label: 'G' },
  ]);

  const [edges] = useState([
    { from: 0, to: 1 },
    { from: 0, to: 2 },
    { from: 1, to: 3 },
    { from: 1, to: 4 },
    { from: 2, to: 5 },
    { from: 2, to: 6 },
  ]);

  const [visiting, setVisiting] = useState(-1);
  const [visited, setVisited] = useState([]);
  const [queue, setQueue] = useState([]);
  const [activeEdges, setActiveEdges] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState([]);

  useEffect(() => {
    generateSteps();
  }, []);

  useEffect(() => {
    if (isPlaying && currentStep < steps.length) {
      const timer = setTimeout(() => {
        const step = steps[currentStep];
        setVisiting(step.visiting);
        setVisited(step.visited);
        setQueue(step.queue);
        setActiveEdges(step.activeEdges);
        setCurrentStep(currentStep + 1);
      }, speed);

      return () => clearTimeout(timer);
    } else if (currentStep >= steps.length && isPlaying) {
      onComplete?.();
    }
  }, [isPlaying, currentStep, speed, steps]);

  const generateSteps = () => {
    const newSteps = [];
    const visitedNodes = [];
    const q = [0];
    const adjList = {};

    edges.forEach(edge => {
      if (!adjList[edge.from]) adjList[edge.from] = [];
      adjList[edge.from].push(edge.to);
    });

    newSteps.push({
      visiting: -1,
      visited: [],
      queue: [0],
      activeEdges: [],
    });

    while (q.length > 0) {
      const current = q.shift();

      newSteps.push({
        visiting: current,
        visited: [...visitedNodes],
        queue: [...q],
        activeEdges: [],
      });

      visitedNodes.push(current);

      newSteps.push({
        visiting: -1,
        visited: [...visitedNodes],
        queue: [...q],
        activeEdges: [],
      });

      const neighbors = adjList[current] || [];
      neighbors.forEach(neighbor => {
        if (!visitedNodes.includes(neighbor) && !q.includes(neighbor)) {
          q.push(neighbor);
          newSteps.push({
            visiting: current,
            visited: [...visitedNodes],
            queue: [...q],
            activeEdges: [{ from: current, to: neighbor }],
          });
        }
      });
    }

    newSteps.push({
      visiting: -1,
      visited: [...visitedNodes],
      queue: [],
      activeEdges: [],
    });

    setSteps(newSteps);
  };

  const handleReset = () => {
    setVisiting(-1);
    setVisited([]);
    setQueue([]);
    setActiveEdges([]);
    setCurrentStep(0);
    generateSteps();
  };

  const isEdgeActive = (from, to) => {
    return activeEdges.some(edge => edge.from === from && edge.to === to);
  };

  const isEdgeVisited = (from, to) => {
    return visited.includes(from) && visited.includes(to);
  };

  return (
    <div className="visualizer-container">
      <div className="graph-container">
        <svg width="500" height="350">
          {edges.map((edge, idx) => {
            const fromNode = nodes.find(n => n.id === edge.from);
            const toNode = nodes.find(n => n.id === edge.to);
            return (
              <line
                key={idx}
                x1={fromNode.x}
                y1={fromNode.y}
                x2={toNode.x}
                y2={toNode.y}
                className={`graph-edge ${
                  isEdgeActive(edge.from, edge.to) ? 'active' :
                  isEdgeVisited(edge.from, edge.to) ? 'visited' : ''
                }`}
              />
            );
          })}

          {nodes.map(node => (
            <g key={node.id}>
              <motion.circle
                cx={node.x}
                cy={node.y}
                r={25}
                className={`graph-node ${
                  visiting === node.id ? 'visiting' :
                  visited.includes(node.id) ? 'visited' :
                  queue.includes(node.id) ? 'queued' : ''
                }`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: node.id * 0.1 }}
              />
              <text
                x={node.x}
                y={node.y}
                className="node-label"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                {node.label}
              </text>
            </g>
          ))}
        </svg>

        <div className="queue-display">
          <h3>Queue:</h3>
          <div className="queue-items">
            {queue.length === 0 ? (
              <span className="empty-queue">Empty</span>
            ) : (
              queue.map((nodeId, idx) => (
                <motion.div
                  key={idx}
                  className="queue-item"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                >
                  {nodes.find(n => n.id === nodeId)?.label}
                </motion.div>
              ))
            )}
          </div>
        </div>
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

export default BFSVisualizer;
