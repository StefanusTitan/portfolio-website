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
              <a href="/projects/project1">MobileNetV2 + SVM for Melanoma Classification</a> - My thesis topic which combines the strong feature extraction of CNN with SVM efficiency to classify melanoma and nonmelanoma images.
            </li>
            <li>
              <a href="/projects/project2">ToDo App</a> - A personal project of a web app to create a To-Do list utilizing React , Next.js, Express, and Sequelize.
            </li>
            <li>
              <a href="/projects/project3">HaBaBox</a> - A project to clone a popular hotel system, BoBoBox, using classic HTML, JavaScript, and CSS along with Node.js.
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
