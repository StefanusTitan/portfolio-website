import React, { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import Image from 'next/image';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import styles from "../../styles/Project.module.css";

const Project2 = () => {
  const images = [
    { src: "/images/todo/todo-1.png", alt: "ToDo app - Profile" },
    { src: "/images/todo/todo-2.png", alt: "ToDo app - Login" },
    { src: "/images/todo/todo-3.png", alt: "ToDo app - About" },
  ];
  const [active, setActive] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
  // trigger mount animations
  setMounted(true);

    const onKey = (e) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight" && active !== null) setActive((s) => (s + 1) % images.length);
      if (e.key === "ArrowLeft" && active !== null) setActive((s) => (s - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  return (
    <>
      <Head>
        <title>ToDo App | Project</title>
        <meta name="description" content="A To-Do web application built with React, Next.js, Express, and Sequelize." />
      </Head>

      <main className={styles.page}>
        <div className={styles.breadcrumb}>
          <Link href="/projects">← Back to Projects</Link>
        </div>

  <section className={`${styles.hero} ${mounted ? styles.heroEnter : ""}`}>
          <div className={styles.heroImage} aria-label="ToDo app preview" role="img">
            <Image src="/images/todo.jpg" alt="ToDo app preview" fill className={styles.heroImageInner} />
          </div>
          <div>
            <h1 className={styles.title}>ToDo App</h1>
            <p className={styles.subtitle}>
              A full-stack To-Do application for creating and managing tasks with user accounts and persistence.
            </p>
            <div className={styles.meta}>
              <span className={styles.tag}>Full-stack</span>
              <span className={styles.tag}>React</span>
              <span className={styles.tag}>Next.js</span>
              <span className={styles.tag}>Express</span>
              <span className={styles.tag}>Sequelize</span>
            </div>
            <div className={styles.actions}>
              <a className={`${styles.button} ${styles.secondary}`} href="https://github.com/StefanusTitan/todo-app" target="_blank" rel="noopener noreferrer">GitHub</a>
            </div>
          </div>
        </section>

        <section className={styles.content}>
          <article className={`${styles.card} ${mounted ? styles.cardEnter : ""}`} id="overview" style={{ animationDelay: `80ms` }}>
            <h3>Overview</h3>
            <p>
              This To-Do app provides a simple, focused interface for creating, updating, and
              organizing tasks. It demonstrates integrating a React/Next.js frontend with an
              Express API and a relational database using Sequelize.
            </p>
          </article>

          <article className={`${styles.card} ${mounted ? styles.cardEnter : ""}`} id="features" style={{ animationDelay: `160ms` }}>
            <h3>Features</h3>
            <ul className={styles.list}>
              <li>User authentication and sessions</li>
              <li>Create, edit, complete, and delete tasks</li>
              <li>Persistent storage with MariaDB (Sequelize)</li>
              <li>Responsive UI and accessibility-minded interactions</li>
            </ul>
          </article>

          <article className={`${styles.card} ${mounted ? styles.cardEnter : ""}`} id="stack" style={{ animationDelay: `240ms` }}>
            <h3>Tech Stack</h3>
            <ul className={styles.list}>
              <li>Next.js / React (frontend)</li>
              <li>Express (REST API)</li>
              <li>Sequelize (ORM) + MariaDB</li>
              <li>JWT / session-based auth</li>
            </ul>
          </article>

          <article className={`${styles.card} ${styles.fullWidth} ${mounted ? styles.cardEnter : ""}`} id="screenshots" style={{ animationDelay: `320ms` }}>
            <h3>Screenshots</h3>
            <p className={styles.subtitle} style={{ marginTop: 4 }}>
              A preview of the app UI.
            </p>
            <ImageList className={styles.gallery} cols={3} gap={8}>
              {images.map((img, i) => (
                <ImageListItem key={img.src} style={{ animationDelay: `${i * 80}ms` }}>
                  <button
                    className={`${styles.thumb} ${mounted ? styles.thumbEnter : ""}`}
                    onClick={() => setActive(i)}
                    aria-label={`Open image ${i + 1}`}
                  >
                    <Image src={img.src} alt={img.alt} className={styles.thumbImage} width={1200} height={800} />
                  </button>
                </ImageListItem>
              ))}
            </ImageList>

            <Dialog open={active !== null} onClose={() => setActive(null)} maxWidth="lg" fullWidth>
              <DialogContent className={styles.lightboxContent} dividers>
                <button className={styles.lightboxClose} onClick={() => setActive(null)} aria-label="Close">✕</button>
                {active !== null && (
                  <Image src={images[active].src} alt={images[active].alt} className={`${styles.lightboxImage} ${styles.lightboxImageAnimate}`} width={1024} height={768} />
                )}
                <div className={styles.lightboxCaption}>{active !== null ? images[active].alt : ""}</div>
                <div className={styles.lightboxNav}>
                  <button onClick={() => setActive((s) => (s - 1 + images.length) % images.length)} aria-label="Previous">←</button>
                  <button onClick={() => setActive((s) => (s + 1) % images.length)} aria-label="Next">→</button>
                </div>
              </DialogContent>
            </Dialog>
          </article>
        </section>
      </main>
    </>
  );
};

export default Project2;
