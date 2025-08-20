import styles from "../styles/Home.module.css";
import Head from 'next/head';

const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <Head>
        <title>Stefanus Titan - Portfolio</title>
        <meta name="description" content="Personal portfolio of Stefanus Titan, a curious developer who loves tinkering with new technologies" />
      </Head>
      
      <main className={styles.main}>
        <div className={styles.hero}>
          <div className={styles.heroText}>
            <h1 className={styles.title}>Stefanus Titan — Portfolio</h1>
            <p className={styles.description}>
              Hey there! I'm Stefanus Titan Elianto — feel free to call me Titan! I'm a
              curious developer who loves tinkering with new technologies, solving
              challenges, and learning something new every day.
            </p>
          </div>

          <img src="/images/me.jpg" alt="Stefanus Titan" className={styles.profileImage} />
        </div>

        <section className={styles.featuredProjects}>
          <h2>Featured Project</h2>
          <ul>
            <li className={styles.projectItem}>
              <div className={styles.projectPreview} style={{ backgroundImage: "url('/images/lifetimeart.png')" }}>
                <div className={styles.projectContent}>
                  <a href="/projects/project3" className={styles.projectLink}>LifetimeArt</a>
                  <p>A take-home project implementing a pixel-perfect Figma design using React, TailwindCSS, and GSAP for animations and responsive behavior.</p>
                </div>
              </div>
            </li>
          </ul>

          <div className={styles.viewMoreContainer}>
            <a href="/projects" className={styles.viewMoreLink}>
              View More Projects →
            </a>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
