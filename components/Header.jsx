import Link from "next/link";
import { useTheme } from '../context/ThemeContext';
import { FaMoon, FaSun } from 'react-icons/fa';
import { FaCode } from 'react-icons/fa'; // Import the code icon

const Header = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  
  return (
    <header className="header">
      <div className="container">
        <h1>
          <FaCode style={{ marginRight: '0.5rem' }} /> My Portfolio
        </h1>
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
          width: 100%;
        }
        .container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          margin: 0;
          padding: 0 2rem;
        }
        h1 {
          margin: 0;
          padding-left: 1rem;
          color: var(--text);
          display: flex;
          align-items: center;
        }
        nav {
          flex: 1;
          display: flex;
          justify-content: center;
          padding-right: 200px; /* Offset for h1 width to maintain true center */
        }
        ul {
          display: flex;
          gap: 4rem; /* Increased from 2rem */
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
          padding: 0.5rem 1rem; /* Added padding to increase clickable area */
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
          padding: 0.5rem;
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
