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
            <div className="footerIcon">
              <FaGithub />
              GitHub
            </div>
          </a>
          <span>|</span>
          <a
            href="https://www.linkedin.com/in/stefanus-titan"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="footerIcon">
              <FaLinkedin />
              LinkedIn
            </div>
          </a>
        </div>
      </div>
      <style jsx>{`
        footer {
          background: var(--card-bg);
          color: var(--text);
          text-align: center;
          padding: 1rem 0;
          width: 100%;
        }
        .container {
          width: 100%;
          margin: 0;
          padding: 0 2rem;
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
        .footerIcon {
          display: flex;
          align-items: center;
          gap: 0.2rem;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
