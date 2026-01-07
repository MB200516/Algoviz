import { spawn } from 'child_process';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TEMP_DIR = path.join(__dirname, '../temp');

const ensureTempDir = async () => {
  try {
    await fs.access(TEMP_DIR);
  } catch {
    await fs.mkdir(TEMP_DIR, { recursive: true });
  }
};

export const executeCode = async (req, res) => {
  try {
    await ensureTempDir();
    
    const { code, language } = req.body;
    const timestamp = Date.now();
    
    let filename, command, args;

    switch (language) {
      case 'python':
        filename = `code_${timestamp}.py`;
        command = 'python3';
        args = [path.join(TEMP_DIR, filename)];
        break;
      
      case 'java':
        filename = `Code_${timestamp}.java`;
        command = 'javac';
        args = [path.join(TEMP_DIR, filename)];
        break;
      
      case 'cpp':
        filename = `code_${timestamp}.cpp`;
        command = 'g++';
        args = [
          path.join(TEMP_DIR, filename),
          '-o',
          path.join(TEMP_DIR, `code_${timestamp}`)
        ];
        break;
      
      default:
        return res.status(400).json({ error: 'Unsupported language' });
    }

    await fs.writeFile(path.join(TEMP_DIR, filename), code);

    const process = spawn(command, args);
    
    let output = '';
    let error = '';

    process.stdout.on('data', (data) => {
      output += data.toString();
    });

    process.stderr.on('data', (data) => {
      error += data.toString();
    });

    process.on('close', async (code) => {
      try {
        await fs.unlink(path.join(TEMP_DIR, filename));
      } catch (err) {
        console.error('Error deleting temp file:', err);
      }

      if (code !== 0) {
        return res.json({ error: error || 'Execution failed' });
      }

      if (language === 'java') {
        const className = filename.replace('.java', '');
        const javaProcess = spawn('java', ['-cp', TEMP_DIR, className]);
        
        let javaOutput = '';
        let javaError = '';

        javaProcess.stdout.on('data', (data) => {
          javaOutput += data.toString();
        });

        javaProcess.stderr.on('data', (data) => {
          javaError += data.toString();
        });

        javaProcess.on('close', async () => {
          try {
            await fs.unlink(path.join(TEMP_DIR, `${className}.class`));
          } catch (err) {
            console.error('Error deleting class file:', err);
          }

          res.json({
            output: javaOutput || javaError,
            error: javaError ? javaError : null
          });
        });
      } else if (language === 'cpp') {
        const execPath = path.join(TEMP_DIR, `code_${timestamp}`);
        const cppProcess = spawn(execPath);
        
        let cppOutput = '';
        let cppError = '';

        cppProcess.stdout.on('data', (data) => {
          cppOutput += data.toString();
        });

        cppProcess.stderr.on('data', (data) => {
          cppError += data.toString();
        });

        cppProcess.on('close', async () => {
          try {
            await fs.unlink(execPath);
          } catch (err) {
            console.error('Error deleting executable:', err);
          }

          res.json({
            output: cppOutput || cppError,
            error: cppError ? cppError : null
          });
        });
      } else {
        res.json({ output: output || error });
      }
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
