import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { Sun, Moon } from 'lucide-react';

function App() {
  const [count, setCount] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

  // Apply/remove dark class to html root
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col items-center justify-center p-4 transition-colors">
      
      {/* Dark mode toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="absolute top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
      >
        {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5" />}
      </button>

      <div className="flex gap-4 mb-8">
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <h1 className="text-3xl font-bold mb-4">Vite + React</h1>

      <div className="card bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow-md dark:shadow-gray-700 mb-4 transition-colors">
        <button
          onClick={() => setCount((count) => count + 1)}
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-500 transition"
        >
          count is {count}
        </button>
        <p className="mt-4">
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>

      <p className="read-the-docs text-gray-700 dark:text-gray-300">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
