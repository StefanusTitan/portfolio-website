import React from "react";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const Project2 = () => {
  return (
    <div>
      <Header />
      <main style={{ padding: "2rem 5rem" }}>
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
