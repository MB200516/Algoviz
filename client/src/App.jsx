import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Visualizer from './pages/Visualizer';
import AlgorithmsPage from './pages/AlgorithmsPage';
import Playground from './pages/Playground';
import './styles/globals.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/visualizer" element={<Visualizer />} />
          <Route path="/algorithms" element={<AlgorithmsPage />} />
          <Route path="/playground" element={<Playground />} />
        </Routes>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: 'var(--bg-tertiary)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-color)',
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App;
