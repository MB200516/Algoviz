import React, { useState } from 'react';
import { motion } from 'framer-motion';
import CodeEditor from '../components/CodeEditor';
import './Playground.css';

const Playground = () => {
  const [language, setLanguage] = useState('python');

  const codeTemplates = {
    python: `# Python Playground
# Write and execute your Python code here

def greet(name):
    return f"Hello, {name}!"

def main():
    name = "World"
    message = greet(name)
    print(message)
    
    # Try implementing an algorithm
    arr = [64, 34, 25, 12, 22, 11, 90]
    print(f"Original array: {arr}")

if __name__ == "__main__":
    main()
`,
    java: `// Java Playground
// Write and execute your Java code here

public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        
        // Try implementing an algorithm
        int[] arr = {64, 34, 25, 12, 22, 11, 90};
        System.out.print("Original array: ");
        for (int num : arr) {
            System.out.print(num + " ");
        }
        System.out.println();
    }
}
`,
    cpp: `// C++ Playground
// Write and execute your C++ code here

#include <iostream>
#include <vector>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    
    // Try implementing an algorithm
    vector<int> arr = {64, 34, 25, 12, 22, 11, 90};
    cout << "Original array: ";
    for (int num : arr) {
        cout << num << " ";
    }
    cout << endl;
    
    return 0;
}
`,
  };

  return (
    <div className="playground-page">
      <motion.div
        className="playground-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="page-title gradient-text">Code Playground</h1>
        <p className="page-subtitle">
          Write, test, and execute code in Python, Java, or C++
        </p>
      </motion.div>

      <motion.div
        className="playground-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="language-selector glass-effect">
          <h3>Select Language:</h3>
          <div className="language-tabs">
            {['python', 'java', 'cpp'].map((lang) => (
              <motion.button
                key={lang}
                className={`language-tab ${language === lang ? 'active' : ''}`}
                onClick={() => setLanguage(lang)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {lang === 'cpp' ? 'C++' : lang.charAt(0).toUpperCase() + lang.slice(1)}
              </motion.button>
            ))}
          </div>
        </div>

        <div className="editor-section">
          <CodeEditor
            initialCode={codeTemplates[language]}
            language={language}
          />
        </div>

        <motion.div
          className="playground-tips glass-effect"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3>💡 Tips for the Playground</h3>
          <ul>
            <li>Write your code in the editor above</li>
            <li>Click the "Run Code" button to execute</li>
            <li>Use "Copy" to copy code to clipboard</li>
            <li>Use "Download" to save code to your computer</li>
            <li>Try implementing algorithms you've learned!</li>
            <li>Output will appear below the editor</li>
          </ul>
        </motion.div>

        <motion.div
          className="example-algorithms glass-effect"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h3>🚀 Try These Algorithms</h3>
          <div className="example-grid">
            <div className="example-card">
              <h4>Bubble Sort</h4>
              <p>Implement a simple sorting algorithm</p>
            </div>
            <div className="example-card">
              <h4>Binary Search</h4>
              <p>Search in a sorted array efficiently</p>
            </div>
            <div className="example-card">
              <h4>Fibonacci</h4>
              <p>Calculate Fibonacci numbers</p>
            </div>
            <div className="example-card">
              <h4>Factorial</h4>
              <p>Compute factorial recursively</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Playground;
