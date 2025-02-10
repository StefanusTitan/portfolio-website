import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "../styles/Home.module.css";

const Home = () => {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main} style={{ padding: "2rem 5rem" }}>
        <h1 className={styles.title}>Welcome to My Portfolio</h1>
        <p className={styles.description}>
          Hey there! I'm Stefanus Titan Elianto — feel free to call me Titan! I'm a
          curious developer who loves tinkering with new technologies, solving
          challenges, and learning something new every day.
        </p>
        <section className={styles.featuredProjects}>
          <h2>Featured Projects</h2>
          <ul>
            <li>
              <a href="/projects/project1">MobileNetV2 + SVM for Melanoma Classification</a> - A research project which combines the strong feature extraction of CNN with SVM efficiency.
            </li>
            <li>
              <a href="/projects/project2">Project 2</a> - A brief description
              of project 2.
            </li>
            <li>
              <a href="/projects/project3">Project 3</a> - A brief description
              of project 3.
            </li>
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
