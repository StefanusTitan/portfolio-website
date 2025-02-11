import React from "react";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styles from "../../styles/Home.module.css"; // added import

const Project3 = () => {
  return (
    <div>
      <Header />
      <main className={`${styles.main} ${styles.contentWidth}`}> {/* removed inline styling */}
        <h1>Project 3</h1>
        <p>
          Provide a detailed overview of Project 3. Discuss objectives, unique features, 
          and relevant findings.
        </p>
        <Link href="/projects">← Back to Projects</Link>
      </main>
      <Footer />
    </div>
  );
};

export default Project3;
