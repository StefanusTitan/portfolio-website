import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "../styles/Home.module.css";

const Home = () => {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to My Portfolio</h1>
        <p className={styles.description}>
          Hey there! I'm Stefanus Titan Elianto — feel free to call me Titan! I'm a
          curious developer who loves tinkering with new technologies, solving
          challenges, and learning something new every day.
        </p>
        <section className={styles.featuredProjects}>
          <h2>Featured Projects</h2>
          <ul>
            <li className={styles.projectItem}>
              <div className={styles.projectPreview} style={{ backgroundImage: "url('/images/melanoma.png')" }}>
                <div className={styles.projectContent}>
                  <a href="/projects/project1">MobileNetV2 + SVM for Melanoma Classification</a>
                  <p>A research project which combines the strong feature extraction of CNN with SVM efficiency.</p>
                </div>
              </div>
            </li>
            <li className={styles.projectItem}>
              <div className={styles.projectPreview} style={{ backgroundImage: "url('/images/todo.png')" }}>
                <div className={styles.projectContent}>
                  <a href="/projects/project2">ToDo App</a>
                  <p>A personal project of a web app to create a To-Do list utilizing React, Next.js, Express, and Sequelize.</p>
                </div>
              </div>
            </li>
            <li className={styles.projectItem}>
              <div className={styles.projectPreview} style={{ backgroundImage: "url('/images/hababox.png')" }}>
                <div className={styles.projectContent}>
                  <a href="/projects/project3">HaBaBox</a>
                  <p>A project to clone a popular hotel system, BoBoBox, using classic HTML, JavaScript, and CSS along with Node.js.</p>
                </div>
              </div>
            </li>
          </ul>
        </section>
        <p style={{ textAlign: "center", marginTop: "1rem" }}>
          <a href="/projects" style={{ fontSize: "1.2rem", textDecoration: "underline" }}>
            View More Projects
          </a>
        </p>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
