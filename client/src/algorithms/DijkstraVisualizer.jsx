import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './GraphVisualizer.css';

const DijkstraVisualizer = ({ isPlaying, speed, onComplete }) => {
  const [nodes] = useState([
    { id: 0, x: 100, y: 150, label: 'A' },
    { id: 1, x: 250, y: 80, label: 'B' },
    { id: 2, x: 250, y: 220, label: 'C' },
    { id: 3, x: 400, y: 80, label: 'D' },
    { id: 4, x: 400, y: 220, label: 'E' },
    { id: 5, x: 550, y: 150, label: 'F' },
  ]);

  const [edges] = useState([
    { from: 0, to: 1, weight: 4 },
    { from: 0, to: 2, weight: 2 },
    { from: 1, to: 2, weight: 1 },
    { from: 1, to: 3, weight: 5 },
    { from: 2, to: 3, weight: 8 },
    { from: 2, to: 4, weight: 10 },
    { from: 3, to: 4, weight: 2 },
    { from: 3, to: 5, weight: 6 },
    { from: 4, to: 5, weight: 3 },
  ]);

  const [visiting, setVisiting] = useState(-1);
  const [visited, setVisited] = useState([]);
  const [distances, setDistances] = useState({});
  const [activeEdge, setActiveEdge] = useState(null);
  const [shortestPath, setShortestPath] = useState([]);
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
        setDistances(step.distances);
        setActiveEdge(step.activeEdge);
        setShortestPath(step.shortestPath);
        setCurrentStep(currentStep + 1);
      }, speed);

      return () => clearTimeout(timer);
    } else if (currentStep >= steps.length && isPlaying) {
      onComplete?.();
    }
  }, [isPlaying, currentStep, speed, steps]);

  const generateSteps = () => {
    const newSteps = [];
    const dist = {};
    const visitedNodes = new Set();
    const prev = {};
    const adjList = {};

    nodes.forEach(node => {
      dist[node.id] = Infinity;
      prev[node.id] = null;
      adjList[node.id] = [];
    });

    edges.forEach(edge => {
      adjList[edge.from].push({ node: edge.to, weight: edge.weight });
      adjList[edge.to].push({ node: edge.from, weight: edge.weight });
    });

    dist[0] = 0;

    newSteps.push({
      visiting: -1,
      visited: [],
      distances: { ...dist },
      activeEdge: null,
      shortestPath: [],
    });

    while (visitedNodes.size < nodes.length) {
      let minDist = Infinity;
      let current = -1;

      for (let i = 0; i < nodes.length; i++) {
        if (!visitedNodes.has(i) && dist[i] < minDist) {
          minDist = dist[i];
          current = i;
        }
      }

      if (current === -1) break;

      newSteps.push({
        visiting: current,
        visited: Array.from(visitedNodes),
        distances: { ...dist },
        activeEdge: null,
        shortestPath: [],
      });

      visitedNodes.add(current);

      newSteps.push({
        visiting: -1,
        visited: Array.from(visitedNodes),
        distances: { ...dist },
        activeEdge: null,
        shortestPath: [],
      });

      const neighbors = adjList[current] || [];
      
      for (const neighbor of neighbors) {
        if (!visitedNodes.has(neighbor.node)) {
          const alt = dist[current] + neighbor.weight;

          newSteps.push({
            visiting: current,
            visited: Array.from(visitedNodes),
            distances: { ...dist },
            activeEdge: { from: current, to: neighbor.node },
            shortestPath: [],
          });

          if (alt < dist[neighbor.node]) {
            dist[neighbor.node] = alt;
            prev[neighbor.node] = current;

            newSteps.push({
              visiting: neighbor.node,
              visited: Array.from(visitedNodes),
              distances: { ...dist },
              activeEdge: { from: current, to: neighbor.node },
              shortestPath: [],
            });
          }
        }
      }
    }

    const path = [];
    let current = nodes.length - 1;
    while (current !== null) {
      path.unshift(current);
      current = prev[current];
    }

    newSteps.push({
      visiting: -1,
      visited: Array.from(visitedNodes),
      distances: { ...dist },
      activeEdge: null,
      shortestPath: path,
    });

    setSteps(newSteps);
  };

  const handleReset = () => {
    setVisiting(-1);
    setVisited([]);
    setDistances({});
    setActiveEdge(null);
    setShortestPath([]);
    setCurrentStep(0);
    generateSteps();
  };

  const isEdgeActive = (from, to) => {
    return activeEdge && 
           ((activeEdge.from === from && activeEdge.to === to) ||
            (activeEdge.from === to && activeEdge.to === from));
  };

  const isEdgeInPath = (from, to) => {
    for (let i = 0; i < shortestPath.length - 1; i++) {
      if ((shortestPath[i] === from && shortestPath[i + 1] === to) ||
          (shortestPath[i] === to && shortestPath[i + 1] === from)) {
        return true;
      }
    }
    return false;
  };

  return (
    <div className="visualizer-container">
      <div className="graph-container">
        <svg width="650" height="350">
          {edges.map((edge, idx) => {
            const fromNode = nodes.find(n => n.id === edge.from);
            const toNode = nodes.find(n => n.id === edge.to);
            const midX = (fromNode.x + toNode.x) / 2;
            const midY = (fromNode.y + toNode.y) / 2;
            
            return (
              <g key={idx}>
                <line
                  x1={fromNode.x}
                  y1={fromNode.y}
                  x2={toNode.x}
                  y2={toNode.y}
                  className={`graph-edge ${
                    isEdgeActive(edge.from, edge.to) ? 'active' :
                    isEdgeInPath(edge.from, edge.to) ? 'visited' : ''
                  }`}
                />
                <text
                  x={midX}
                  y={midY - 10}
                  className="edge-weight"
                  textAnchor="middle"
                  fill="var(--color-warning)"
                  fontSize="14"
                  fontWeight="600"
                >
                  {edge.weight}
                </text>
              </g>
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
                  shortestPath.includes(node.id) ? 'queued' : ''
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
              <text
                x={node.x}
                y={node.y + 45}
                className="distance-label"
                textAnchor="middle"
                fill="var(--color-primary)"
                fontSize="12"
                fontWeight="600"
              >
                {distances[node.id] === Infinity ? '∞' : distances[node.id]}
              </text>
            </g>
          ))}
        </svg>

        <div className="dijkstra-info">
          <div className="info-section">
            <h3>Distances from Source (A):</h3>
            <div className="distances-grid">
              {nodes.map(node => (
                <div key={node.id} className="distance-item">
                  <span className="node-name">{node.label}:</span>
                  <span className="distance-value">
                    {distances[node.id] === Infinity ? '∞' : distances[node.id]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {shortestPath.length > 0 && (
            <div className="info-section">
              <h3>Shortest Path to F:</h3>
              <div className="path-display">
                {shortestPath.map((nodeId, idx) => (
                  <span key={idx}>
                    {nodes.find(n => n.id === nodeId)?.label}
                    {idx < shortestPath.length - 1 && ' → '}
                  </span>
                ))}
              </div>
              <div className="path-length">
                Total Distance: {distances[nodes.length - 1]}
              </div>
            </div>
          )}
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

export default DijkstraVisualizer;
