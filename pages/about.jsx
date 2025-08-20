import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/Home.module.css";
import Head from 'next/head';

const About = () => {
  const mainRef = useRef(null);
  const [visibleSections, setVisibleSections] = useState([]);

  useEffect(() => {
    if (!mainRef.current) return;
    const sectionNodes = Array.from(mainRef.current.querySelectorAll('section'));
    if (sectionNodes.length === 0) return;

    // initialize visibility array
    setVisibleSections(prev => (prev.length === sectionNodes.length ? prev : Array(sectionNodes.length).fill(false)));

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = sectionNodes.indexOf(entry.target);
          if (index !== -1) {
            setVisibleSections(prev => {
              const next = prev.slice();
              next[index] = true;
              return next;
            });
            observer.unobserve(entry.target);
          }
        }
      });
    }, { threshold: 0.18 });

    sectionNodes.forEach(node => observer.observe(node));

    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.homeContainer}>
      <Head>
        <title>About | Stefanus Titan</title>
        <meta name="description" content="Learn more about Stefanus Titan: background, education, skills, and interests." />
      </Head>
      <main ref={mainRef} className={styles.main}>
        <h1 className={styles.title}>About Me</h1>
        <p>
          Welcome to my portfolio! I am a passionate developer with a background in web development,
          Artificial Intelligence, Machine Learning, and Deep Learning. I have experience in various
          programming languages and frameworks like Java, Python, Go, JavaScript, and SQL. I’m always
          looking for new challenges and opportunities to grow as a developer.
        </p>
        <section className={visibleSections[0] ? `${styles.animateFadeUp} ${styles.delay1}` : ''}>
          <h2>Background</h2>
          <p style={{ textAlign: "justify" }}>
            I have worked on various projects that have honed my skills in front-end and back-end development.
            My journey in tech began with a fascination of technology and coding which evolved into a career
            where I can express my creativity and problem-solving abilities.
            <br /><br />
            Not only do I have a strong technical foundation, but I also have a keen eye for problem solving.
            I am always looking for ways to improve my skills and learn new technologies to stay current in the
            ever changing landscape of web development and in the exponential development of AI. I am excited to
            see where my journey in tech will take me next!
          </p>
        </section>

        <section className={visibleSections[1] ? `${styles.animateFadeUp} ${styles.delay2}` : ''}>
          <h2>Education</h2>
          <p style={{ textAlign: "justify" }}>
            I am currently a fresh graduate from Institut Teknologi Harapan Bangsa (ITHB) with a degree in
            Informatics with a GPA of 3.76 and I have taken various courses in web development, project
            management, Artificial Intelligence, Machine Learning, and Deep Learning. I have also taken courses
            in Java, Python, Golang, and SQL. Other than that, I also have taken courses in soft skills like
            effective communication, team collaboration, adaptability, problem-solving, and time management.
          </p>
        </section>

        <section className={visibleSections[2] ? `${styles.animateFadeUp} ${styles.delay3}` : ''}>
          <h2>Other Interests</h2>
          <ul>
            <li>PC Hardware Enthusiast</li>
            <li>Playing video games</li>
          </ul>
        </section>

        <section className={visibleSections[3] ? `${styles.animateFadeUp} ${styles.delay4}` : ''}>
          <h2>Skills</h2>
          <ul>
            <li>JavaScript (React, Next.js, Vue)</li>
            <li>HTML & CSS</li>
            <li>Node.js & Express</li>
            <li>Python</li>
            <li>Golang</li>
            <li>Java</li>
            <li>SQL</li>
            <li>Artificial Intelligence</li>
            <li>Machine Learning</li>
            <li>Deep Learning</li>
            <li>Version Control (Git)</li>
          </ul>
        </section>

        <section className={visibleSections[4] ? `${styles.animateFadeUp} ${styles.delay1}` : ''}>
          <h2>Soft Skills</h2>
          <ul>
            <li>Effective Communication</li>
            <li>Team Collaboration</li>
            <li>Adaptability</li>
            <li>Problem-Solving</li>
            <li>Time Management</li>
          </ul>
        </section>
      </main>
    </div>
  );
};

export default About;
