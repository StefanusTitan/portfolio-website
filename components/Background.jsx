import { useState } from "react";
import Image from "next/image";
import { about, education, certifications, skills } from "../data/background";
import Lightbox from "./Lightbox";
import section from "./Section.module.css";
import styles from "./Background.module.css";

const certImages = certifications
  .filter((c) => c.image)
  .map((c) => ({ type: "image", ...c.image }));

export default function Background() {
  const [open, setOpen] = useState(null);
  const close = () => setOpen(null);

  return (
    <section id="background" className={`page ${section.section}`} aria-labelledby="background-title">
      <h2 id="background-title" className={section.heading}>
        Background
      </h2>

      <div className={section.split}>
        <div className={styles.portrait}>
          <Image
            src="/images/me.jpg"
            alt="Titan in a garden, smiling, with a tall cactus behind him"
            fill
            sizes="(max-width: 959px) 60vw, 300px"
          />
        </div>

        <div className={styles.content}>
          <div className={styles.about}>
            {about.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>

          <div className={styles.block}>
            <h3 className={styles.blockTitle}>Education</h3>
            <div className={styles.education}>
              <p className={styles.strong}>{education.degree}</p>
              <p>{education.school}</p>
              <p className={styles.muted}>
                {education.period}. {education.notes.join(", ")}.
              </p>
            </div>
          </div>

          <div className={styles.block}>
            <h3 className={styles.blockTitle}>Skills</h3>
            <dl className={styles.skills}>
              {skills.map((s) => (
                <div key={s.group}>
                  <dt>{s.group}</dt>
                  <dd>{s.items}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className={styles.block}>
            <h3 className={styles.blockTitle}>Certifications</h3>
            <ul className={styles.certs}>
              {certifications.map((c) => {
                const imageIndex = c.image ? certImages.findIndex((i) => i.src === c.image.src) : -1;
                return (
                  <li key={c.title} className={styles.cert}>
                    <span className={styles.certTitle}>
                      {c.href ? (
                        <a href={c.href} target="_blank" rel="noopener noreferrer">
                          {c.title}
                        </a>
                      ) : c.image ? (
                        <button
                          type="button"
                          className={styles.certButton}
                          onClick={() => setOpen(imageIndex)}
                        >
                          {c.title}
                        </button>
                      ) : (
                        c.title
                      )}
                    </span>
                    <span className={styles.certIssuer}>{c.issuer}</span>
                    <span className={styles.certDate}>{c.issued}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      <Lightbox items={certImages} index={open} onChange={setOpen} onClose={close} idPrefix="cert" />
    </section>
  );
}
