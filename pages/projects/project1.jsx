import React from "react";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const Project1 = () => {
  return (
    <div>
      <Header />
      <main style={{ padding: "2rem 5rem" }}>
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
