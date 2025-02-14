import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "../styles/Home.module.css";

const About = () => {
  return (
    <div className={styles.container}>
      <Header />
      <main className={`${styles.main} ${styles.contentWidth}`}>
        <h1>About Me</h1>
        <p style={{ textAlign: "justify" }}>
          Welcome to my portfolio! I am a passionate developer with a background
          in web development, Artificial Intelligence, Machine Learning, and Deep Learning. 
          Also I have experience in various programming languages and frameworks like Java, Python, Go, 
          JavaScript, and SQL. I am always looking for new challenges and opportunities to grow as a developer. 
        </p>
        <h2>Background</h2>
        <p style={{ textAlign: "justify" }}>
          I have worked on various projects that have honed my skills in front-end and back-end
          development. My journey in tech began with a fascination of technology and coding which 
          evolved into a career where I can express my creativity and
          problem-solving abilities.

          Not only do I have a strong technical foundation, but I also have a
          keen eye for problem solving. I am always looking for ways to improve
          my skills and learn new technologies to stay current in the ever
          changing landscape of web development and in the exponential development of AI. 
          I am excited to see where my journey in tech will take me next!
        </p>
        
        <h2>Education</h2>
        <p style={{ textAlign: "justify" }}>
        I am currently an undegraduate in Institut Teknologi Harapan Bangsa (ITHB) pursuing a degree in Informatics with a GPA of 3.74 
        and I have taken various courses in web development, project management, Artificial Intelligence, Machine Learning, and Deep Learning. 
        I have also taken courses in Java, Python, Go, and SQL. Other than that, I also have taken courses in soft skills like 
        effective communication, team collaboration, adaptability, problem-solving, and time management.
        </p>
        <h2>Other Interests</h2>
          <ul>
            <li>PC Hardware Enthusiast</li>
            <li>Playing video games</li>
          </ul>
  
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
        <h2>Soft Skills</h2>
        <ul>
          <li>Effective Communication</li>
          <li>Team Collaboration</li>
          <li>Adaptability</li>
          <li>Problem-Solving</li>
          <li>Time Management</li>
        </ul>
      </main>
      <Footer />
    </div>
  );
};

export default About;
