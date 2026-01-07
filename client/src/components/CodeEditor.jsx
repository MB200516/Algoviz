import React, { useState } from 'react';
import { motion } from 'framer-motion';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { java } from '@codemirror/lang-java';
import { cpp } from '@codemirror/lang-cpp';
import { oneDark } from '@codemirror/theme-one-dark';
import { Play, Download, Copy, Check } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import './CodeEditor.css';
import { API_URL } from '../config';


const CodeEditor = ({ initialCode = '', language = 'python' }) => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);


  const languageExtensions = {
    python: python(),
    java: java(),
    cpp: cpp(),
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput('Running...');
    
    try {
      const response = await axios.post(`${API_URL}/code/execute`, {
        code,
        language,
      });
      
      setOutput(response.data.output || response.data.error);
    } catch (error) {
      setOutput(error.response?.data?.error || 'Error executing code');
      toast.error('Failed to execute code');
    } finally {
      setIsRunning(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success('Code copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const extensions = { python: 'py', java: 'java', cpp: 'cpp' };
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `code.${extensions[language]}`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Code downloaded');
  };

  return (
    <div className="code-editor-container glass-effect">
      <div className="editor-header">
        <div className="editor-tabs">
          <div className="editor-tab active">
            <span className="language-badge">{language.toUpperCase()}</span>
          </div>
        </div>
        
        <div className="editor-actions">
          <motion.button
            className="editor-btn"
            onClick={handleCopy}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {copied ? <Check size={18} /> : <Copy size={18} />}
          </motion.button>
          
          <motion.button
            className="editor-btn"
            onClick={handleDownload}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download size={18} />
          </motion.button>
          
          <motion.button
            className="editor-btn run-btn"
            onClick={handleRunCode}
            disabled={isRunning}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Play size={18} />
            <span>{isRunning ? 'Running...' : 'Run Code'}</span>
          </motion.button>
        </div>
      </div>

      <div className="editor-content">
        <CodeMirror
          value={code}
          height="400px"
          theme={oneDark}
          extensions={[languageExtensions[language]]}
          onChange={(value) => setCode(value)}
          className="code-mirror"
        />
      </div>

      {output && (
        <motion.div
          className="output-panel"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
        >
          <div className="output-header">Output</div>
          <pre className="output-content">{output}</pre>
        </motion.div>
      )}
    </div>
  );
};

export default CodeEditor;
