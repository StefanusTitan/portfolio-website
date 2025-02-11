import React from "react";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styles from "../../styles/Home.module.css"; // added import

const Project2 = () => {
  return (
    <div>
      <Header />
      <main className={`${styles.main} ${styles.contentWidth}`}> {/* removed inline styling */}
        <h1>Project 2</h1>
        <p>
          Provide more details about Project 2 here. Describe the core functionalities, 
          technology stack, and key takeaways.
        </p>
        <Link href="/projects">← Back to Projects</Link>
      </main>
      <Footer />
    </div>
  );
};

export default Project2;
