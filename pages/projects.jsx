import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "../styles/Home.module.css";

const Projects = () => {
  const projectList = [
    {
      title: "Project One",
      description: "Description of project one.",
      link: "https://link-to-project-one.com",
    },
    {
      title: "Project Two",
      description: "Description of project two.",
      link: "https://link-to-project-two.com",
    },
    {
      title: "Project Three",
      description: "Description of project three.",
      link: "https://link-to-project-three.com",
    },
  ];

  return (
    <div className={styles.container}>
      <Header />
      <main className={`${styles.main} ${styles.contentWidth}`}>
        <h1>My Projects</h1>
        <ul>
          {projectList.map((project, index) => (
            <li key={index}>
              <h2>{project.title}</h2>
              <p>{project.description}</p>
              <a href={project.link} target="_blank" rel="noopener noreferrer">
                View Project
              </a>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </div>
  );
};

export default Projects;
