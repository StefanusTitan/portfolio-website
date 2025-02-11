import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa"; // Import icons

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <p>
          &copy; {new Date().getFullYear()} Stefanus Titan Elianto. All rights
          reserved.
        </p>
        <p style={{ fontSize: "0.9rem", margin: "0.3rem 0" }}>
          Built with React & Next.js
        </p>
        <div className="social-links">
          <a
            href="https://github.com/StefanusTitan"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub /> GitHub
          </a>
          <span>|</span>
          <a
            href="https://www.linkedin.com/in/stefanus-titan"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin /> LinkedIn
          </a>
        </div>
      </div>
      <style jsx>{`
        footer {
          background: var(--card-bg);
          color: var(--text);
          text-align: center;
          padding: 1rem 2rem;
          border-top: none; /* Remove the white line */
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
        }
        .container {
          max-width: 1200px;
          margin: 0 auto;
        }
        .social-links {
          margin-top: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }
        .social-links a {
          display: flex;
          align-items: center;
          color: var(--text);
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .social-links a:hover {
          color: #0070f3;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
