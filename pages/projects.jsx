import React from "react";
import styles from "../styles/Home.module.css";
import Head from 'next/head';
import Link from 'next/link';

const Projects = () => {
  const projectList = [
    {
      title: "MobileNetV2 + SVM for Melanoma Classification",
      description: "Lightweight melanoma detection pipeline using MobileNetV2 features and an SVM classifier.",
      link: "/projects/project1",
      preview: "/images/melanoma.png",
    },
    {
      title: "ToDo App",
      description: "A full-stack To-Do application for creating and managing tasks with user accounts and persistence.",
      link: "/projects/project2",
      preview: "/images/todo.png",
    },
    {
      title: "LifetimeArt — Pixel-perfect Figma → Web",
      description: "A take-home project implementing a pixel-perfect Figma design using React, TailwindCSS, and GSAP for smooth, performant animations and responsive layouts.",
      link: "/projects/project3",
      preview: "/images/lifetimeart.png",
    },
  ];

  return (
    <div className={styles.homeContainer}>
      <Head>
        <title>Projects | Stefanus Titan</title>
        <meta name="description" content="All projects by Stefanus Titan" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>Projects</h1>
        <p className={styles.description}>
          A collection of things I’ve built and explored. Here are some highlights and experiments.
        </p>

        <section className={styles.featuredProjects}>
          <ul>
            {projectList.map((project, index) => (
              <li key={index} className={styles.projectItem}>
                <div
                  className={styles.projectPreview}
                  style={{
                    backgroundImage: project.preview ? `url('${project.preview}')` : 'none',
                    backgroundColor: project.preview ? 'transparent' : 'var(--card-bg)'
                  }}
                >
                  <div className={styles.projectContent}>
                    {project.link && project.link.startsWith('http') ? (
                      <a
                        href={project.link}
                        className={styles.projectLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {project.title}
                      </a>
                    ) : (
                      <Link href={project.link} className={styles.projectLink}>
                        {project.title}
                      </Link>
                    )}
                    <p>{project.description}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default Projects;
