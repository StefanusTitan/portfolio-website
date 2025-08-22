import styles from "../styles/Home.module.css";
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <Head>
        <title>Stefanus Titan - Portfolio</title>
        <meta name="description" content="Personal portfolio of Stefanus Titan, a curious developer who loves tinkering with new technologies" />
      </Head>
      
      <main className={styles.main}>
        <div className={styles.hero}>
          <div className={`${styles.heroText} ${styles.animateFadeLeft} ${styles.delay1}`}>
            <h1 className={styles.title}>Stefanus Titan Elianto</h1>
            <p className={styles.description}>
              Hey there! I'm Stefanus Titan Elianto — feel free to call me Titan! I'm a
              curious developer who loves tinkering with new technologies, solving
              challenges, and learning something new every day.
            </p>

            <p style={{ fontWeight: 700, marginTop: "0.5rem" }}>
              What I'm looking for: Open to remote or on-site / hybrid roles in Bandung. Available now.
            </p>
          </div>

          <Image
            src="/images/me.jpg"
            alt="Stefanus Titan"
            className={`${styles.profileImage} ${styles.animateFadeRight} ${styles.delay2}`}
            width={260}
            height={260}
          />
        </div>

        <section className={styles.featuredProjects}>
          <h2>Featured Project</h2>
          <ul>
            <li className={styles.projectItem}>
                <div
                  className={`${styles.projectPreview} ${styles.animateFadeUp} ${styles.delay3}`}
                  style={{
                    backgroundImage: `url('/images/lifetimeart.png')`,
                    backgroundColor: 'transparent'
                  }}
                >
                  <div className={styles.projectContent}>
                    <div className={styles.projectContent}>
                      <a href="/projects/project3" className={styles.projectLink}>LifetimeArt</a>
                      <p>A take-home project implementing a pixel-perfect Figma design using React, TailwindCSS, and GSAP for animations and responsive behavior.</p>
                    </div>
                  </div>
                </div>
            </li>
          </ul>

          <div className={styles.viewMoreContainer}>
            <Link href="/projects">
              <Button
                variant="contained"
                size="large"
                className={`${styles.viewMoreLink} ${styles.animateFadeUp} ${styles.delay4}`}
                endIcon={<ArrowForwardIcon />}
              >
                View More Projects
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
