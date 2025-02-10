import React from "react";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const Project3 = () => {
  return (
    <div>
      <Header />
      <main style={{ padding: "2rem 5rem" }}>
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
