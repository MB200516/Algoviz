import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './GraphVisualizer.css';

const DFSVisualizer = ({ isPlaying, speed, onComplete }) => {
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
  const [stack, setStack] = useState([]);
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
        setStack(step.stack);
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
    const adjList = {};

    edges.forEach(edge => {
      if (!adjList[edge.from]) adjList[edge.from] = [];
      adjList[edge.from].push(edge.to);
    });

    const dfs = (node, stack) => {
      newSteps.push({
        visiting: node,
        visited: [...visitedNodes],
        stack: [...stack],
        activeEdges: [],
      });

      visitedNodes.push(node);

      newSteps.push({
        visiting: -1,
        visited: [...visitedNodes],
        stack: [...stack],
        activeEdges: [],
      });

      const neighbors = adjList[node] || [];
      neighbors.forEach(neighbor => {
        if (!visitedNodes.includes(neighbor)) {
          newSteps.push({
            visiting: node,
            visited: [...visitedNodes],
            stack: [...stack, neighbor],
            activeEdges: [{ from: node, to: neighbor }],
          });
          dfs(neighbor, [...stack, neighbor]);
        }
      });
    };

    dfs(0, [0]);

    newSteps.push({
      visiting: -1,
      visited: [...visitedNodes],
      stack: [],
      activeEdges: [],
    });

    setSteps(newSteps);
  };

  const handleReset = () => {
    setVisiting(-1);
    setVisited([]);
    setStack([]);
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
                  stack.includes(node.id) ? 'queued' : ''
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

        <div className="stack-display">
          <h3>Stack:</h3>
          <div className="stack-items">
            {stack.length === 0 ? (
              <span className="empty-stack">Empty</span>
            ) : (
              stack.map((nodeId, idx) => (
                <motion.div
                  key={idx}
                  className="stack-item"
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

export default DFSVisualizer;
