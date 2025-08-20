import React, { useState, useEffect } from "react";
import Link from "next/link";

import Head from "next/head";
import Image from 'next/image';
import styles from "../../styles/Project.module.css";

const Project1 = () => {
  const images = [
    { src: "/images/project1/ui_3.png", alt: "UI mockup 1" },
    { src: "/images/project1/ui_4.png", alt: "UI mockup 2" },
    { src: "/images/project1/linear_svm_recall.png", alt: "Linear SVM recall plot" },
    { src: "/images/project1/rbf_recall_heatmap.png", alt: "RBF kernel recall heatmap" },
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
        <title>Melanoma Classification — MobileNetV2 + SVM | Project</title>
        <meta
          name="description"
          content="A research project combining MobileNetV2 feature extraction with SVM classification for melanoma detection. Includes approach, results, and tech stack."
        />
      </Head>

      <main className={styles.page}>
        <div className={styles.breadcrumb}>
          <Link href="/projects">← Back to Projects</Link>
        </div>

  <section className={`${styles.hero} ${mounted ? styles.heroEnter : ""}`}>
          <div className={styles.heroImage} aria-label="Melanoma project preview" role="img">
            <Image src="/images/melanoma.png" alt="Melanoma project preview" fill className={styles.heroImageInner} />
          </div>
          <div>
            <h1 className={styles.title}>MobileNetV2 + SVM for Melanoma Classification</h1>
            <p className={styles.subtitle}>
              Combining CNN feature extraction with classical machine learning for efficient, robust skin lesion classification.
            </p>
            <div className={styles.meta}>
              <span className={styles.tag}>Computer Vision</span>
              <span className={styles.tag}>Deep Learning</span>
              <span className={styles.tag}>SVM</span>
              <span className={styles.tag}>MobileNetV2</span>
            </div>
            <div className={styles.actions}>
              <a className={`${styles.button} ${styles.secondary}`} href="https://github.com/StefanusTitan/MobileNetV2-SVM-for-Melanoma-Classification" target="_blank" rel="noopener noreferrer">GitHub</a>
            </div>
          </div>
        </section>

        <section className={styles.content}>
          <article className={`${styles.card} ${mounted ? styles.cardEnter : ""}`} id="overview" style={{ animationDelay: `80ms` }}>
            <h3>Overview</h3>
            <p>
              This project explores using <strong>MobileNetV2</strong> as a lightweight, high-quality
              feature extractor and pairing it with a <strong>Support Vector Machine (SVM)</strong> for final
              classification. The goal is to achieve strong performance with faster inference and
              simpler training dynamics compared to full end-to-end fine-tuning.
            </p>
          </article>

          <article className={`${styles.card} ${mounted ? styles.cardEnter : ""}`} id="approach" style={{ animationDelay: `160ms` }}>
            <h3>Approach</h3>
            <ul className={styles.list}>
              <li>Preprocess dermoscopic images (resize, normalize, augment).</li>
              <li>Use MobileNetV2 (ImageNet weights) to extract embeddings from penultimate layer.</li>
              <li>Train SVM with RBF kernel and Linear kernel on extracted features; tune C and gamma via cross-validation.</li>
              <li>Evaluate performance based on the highest recall with acceptable false positive rate.</li>
            </ul>
          </article>

          <article className={`${styles.card} ${mounted ? styles.cardEnter : ""}`} id="results" style={{ animationDelay: `240ms` }}>
            <h3>Results</h3>
            <p>
              On the validation set, the pipeline achieved competitive accuracy and balanced metrics.
              The decoupled setup made it easy to iterate on features and classifiers independently.
            </p>
            <ul className={styles.list}>
              <li>Strong recall on melanoma class.</li>
              <li>Reduced training time versus full fine-tuning.</li>
              <li>Lightweight deployment footprint.</li>
            </ul>
          </article>

          <article className={`${styles.card} ${mounted ? styles.cardEnter : ""}`} id="stack" style={{ animationDelay: `320ms` }}>
            <h3>Tech Stack</h3>
            <ul className={styles.list}>
              <li>Python, PyTorch/TensorFlow (for MobileNetV2)</li>
              <li>scikit-learn (SVM, CV)</li>
              <li>NumPy, Pandas, Matplotlib</li>
            </ul>
          </article>

          <article className={`${styles.card} ${styles.fullWidth} ${mounted ? styles.cardEnter : ""}`} id="gallery" style={{ animationDelay: `400ms` }}>
            <h3>Gallery</h3>
            <p className={styles.subtitle} style={{ marginTop: 4 }}>
              Visuals from experiments and UI mockups — click to enlarge.
            </p>
            <div className={styles.gallery} role="list">
              {images.map((img, i) => (
                <button
                  key={img.src}
                  className={`${styles.thumb} ${mounted ? styles.thumbEnter : ""}`}
                  onClick={() => setActive(i)}
                  aria-label={`Open image ${i + 1}`}
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <Image src={img.src} alt={img.alt} className={styles.thumbImage} width={1200} height={800} />
                </button>
              ))}
            </div>

            {active !== null && (
              <div
                className={styles.lightbox}
                role="dialog"
                aria-modal="true"
                onClick={() => setActive(null)}
              >
                <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
                  <button className={styles.lightboxClose} onClick={() => setActive(null)} aria-label="Close">✕</button>
                  <Image src={images[active].src} alt={images[active].alt} className={`${styles.lightboxImage} ${styles.lightboxImageAnimate}`} width={1024} height={768} />
                  <div className={styles.lightboxCaption}>{images[active].alt}</div>
                  <div className={styles.lightboxNav}>
                    <button onClick={() => setActive((s) => (s - 1 + images.length) % images.length)} aria-label="Previous">←</button>
                    <button onClick={() => setActive((s) => (s + 1) % images.length)} aria-label="Next">→</button>
                  </div>
                </div>
              </div>
            )}
          </article>
        </section>
      </main>
    </>
  );
};

export default Project1;
