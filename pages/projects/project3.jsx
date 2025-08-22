import React, { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import Image from 'next/image';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import MediaLightbox from '../../components/MediaLightbox';
import styles from "../../styles/Project.module.css";

const Project3 = () => {
  // Use the included video assets for LifetimeArt (desktop/tablet/mobile).
  // Each entry has a type so the gallery + lightbox can render images or videos.
  const images = [
    { type: "video", src: "/videos/lifetimeart-desktop.mp4", alt: "LifetimeArt demo — desktop" },
    { type: "video", src: "/videos/lifetimeart-tablet.mp4", alt: "LifetimeArt demo — tablet" },
    { type: "video", src: "/videos/lifetimeart-mobile.mp4", alt: "LifetimeArt demo — mobile" },
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
        <title>LifetimeArt — Pixel-perfect Figma → Web | Project</title>
        <meta name="description" content="LifetimeArt: a take-home project implementing a pixel-perfect Figma design with smooth, performant animations and responsive layouts." />
      </Head>

      <main className={styles.page}>
        <div className={styles.breadcrumb}>
          <Link href="/projects">← Back to Projects</Link>
        </div>

  <section className={`${styles.hero} ${mounted ? styles.heroEnter : ""}`}>
          <div className={styles.heroMedia}>
            <video
              className={styles.heroVideo}
              src="/videos/lifetimeart-desktop.mp4"
              aria-label="LifetimeArt demo video"
              role="img"
              autoPlay
              muted
              loop
              playsInline
            />
          </div>
          <div>
            <h1 className={styles.title}>LifetimeArt</h1>
            <p className={styles.subtitle}>
              A take-home project: pixel-perfect implementation from Figma focusing on smooth, performant animations and fully responsive design.
            </p>
            <div className={styles.meta}>
              <span className={styles.tag}>Take-home</span>
              <span className={styles.tag}>Figma → HTML/CSS</span>
              <span className={styles.tag}>Animations</span>
              <span className={styles.tag}>Responsive</span>
            </div>
            <div className={styles.actions}>
              <a className={styles.button} href="https://lifetimeart-stefanus.vercel.app/" target="_blank" rel="noopener noreferrer">Demo</a>
              <a className={`${styles.button} ${styles.secondary}`} href="https://github.com/StefanusTitan/lifetime-art" target="_blank" rel="noopener noreferrer">GitHub</a>
            </div>
          </div>
        </section>

        <section className={styles.content}>
          <article className={`${styles.card} ${mounted ? styles.cardEnter : ""}`} id="overview" style={{ animationDelay: `80ms` }}>
            <h3>Overview</h3>
            <p>
              A modern, polished website built to showcase home renovation and restoration work. The project
              focuses on clean, consistent design, fast-loading pages, responsive layouts, and deploy-ready
              standards so the site is easy to publish, maintain, and extend as the business grows.
            </p>
          </article>

          <article className={`${styles.card} ${mounted ? styles.cardEnter : ""}`} id="features" style={{ animationDelay: `160ms` }}>
            <h3>Highlights</h3>
            <ul className={styles.list}>
              <li>Modern, polished website that showcases home renovation and restoration work.</li>
              <li>Clean, consistent design across the site for a professional brand feel.</li>
              <li>Fast-loading pages and thoughtfully optimized images for a smooth visitor experience.</li>
              <li>Fully responsive — looks great on phones, tablets, and desktops.</li>
              <li>Project gallery that highlights past jobs and craftsmanship.</li>
              <li>Clear, simple contact area to convert visitors into leads.</li>
              <li>Easy to update and extend as the business grows (new projects, services, testimonials).</li>
              <li>Built with deploy-ready standards so it’s easy to publish and maintain.</li>
            </ul>
          </article>

          <article className={`${styles.card} ${styles.fullWidth} ${mounted ? styles.cardEnter : ""}`} id="screenshots" style={{ animationDelay: `240ms` }}>
            <h3>Demo</h3>
            <p className={styles.subtitle} style={{ marginTop: 4 }}>
              Click to open and play the demo media.
            </p>
            <div className={styles.gallery} role="list">
              {images.map((media, i) => (
                <button
                  key={media.src}
                  className={`${styles.thumb} ${mounted ? styles.thumbEnter : ""}`}
                  onClick={() => setActive(i)}
                  aria-label={`Open media ${i + 1}`}
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  {media.type === 'video' ? (
                    <video src={media.src} muted playsInline className={styles.thumbImage} aria-hidden />
                  ) : (
                    <Image src={media.src} alt={media.alt} className={styles.thumbImage} width={360} height={220} />
                  )}
                </button>
              ))}
            </div>

            <MediaLightbox images={images} active={active} setActive={setActive} />
          </article>
        </section>
      </main>
    </>
  );
};

export default Project3;
