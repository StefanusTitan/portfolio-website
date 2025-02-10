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
        <p style={{ fontSize: "0.9rem", color: "#666", margin: "0.3rem 0" }}>
          Built with React & Next.js
        </p>
        <div
          style={{
            marginTop: "0.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <a
            href="https://github.com/StefanusTitan"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "flex", alignItems: "center", color: "#24292e" }}
          >
            <FaGithub style={{ marginRight: "0.3rem" }} /> GitHub
          </a>
          <span style={{ margin: "0 0.5rem" }}>|</span>
          <a
            href="https://www.linkedin.com/in/stefanus-titan"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "flex", alignItems: "center", color: "#0A66C2" }}
          >
            <FaLinkedin style={{ marginRight: "0.3rem" }} /> LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
