import Link from "next/link";
import { useTheme } from '../context/ThemeContext';
import { FaMoon, FaSun } from 'react-icons/fa';
import { FaCode } from 'react-icons/fa'; // Import the code icon

const Header = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  
  return (
    <header className="header">
      <div className="container">
        <nav>
          <ul>
            <li className="nav-item">
              <Link href="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link href="/about">About Me</Link>
            </li>
            <li className="nav-item">
              <Link href="/projects">Projects</Link>
            </li>
          </ul>
        </nav>
        <button 
          onClick={toggleDarkMode}
          className="theme-toggle"
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>
      <style jsx>{`
        header {
          background: var(--header-bg);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); // added for a modern look
          width: 100%;
        }
        .container {
          display: flex;
          align-items: center;
          justify-content: space-between; // modern, clean alignment
          width: 50%;
          margin: 0 auto;
          padding: 0 2rem;
        }
        nav {
          display: flex;
          justify-content: flex-start; // changed alignment to the left
        }
        ul {
          display: flex;
          gap: 2rem; // reduced gap between nav items
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .nav-item {
          font-size: 1.2rem;
          font-weight: bold;
          transition:
            transform 0.2s ease,
            text-shadow 0.2s ease,
            color 0.2s ease;
        }
        .nav-item:hover {
          transform: scale(1.05);
          text-shadow: 0 0 8px #90d5e2;
          color: var(--text);
        }
        nav :global(a) {
          color: var(--text);
          text-decoration: none;
          padding: 0.5rem 0; /* removed left and right padding */
          display: block; /* Makes the entire area clickable */
        }
        nav :global(a:hover) {
          text-decoration: none;
          color: var(--text);
        }
        .theme-toggle {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.5rem 0;
          color: var(--text);
          font-size: 1.2rem;
          transition: transform 0.2s ease;
        }
        .theme-toggle:hover {
          transform: scale(1.1);
        }
      `}</style>
    </header>
  );
};

export default Header;
