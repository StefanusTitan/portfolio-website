import React from "react";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styles from "../../styles/Home.module.css";

const Project1 = () => {
  return (
    <div>
      <Header />
      <main className={`${styles.main} ${styles.contentWidth}`}>
        <h1>MobileNetV2 + SVM for Melanoma Classification</h1>
        <p>
          Detailed description and insights about the MobileNetV2 + SVM project go here.
          Highlight challenges, solutions, and results.
        </p>
        <Link href="/projects">← Back to Projects</Link>
      </main>
      <Footer />
    </div>
  );
};

export default Project1;
