import { motion } from "motion/react";
import { profile } from "../data/profile";
import styles from "./Hero.module.css";

const FROM = '"wght" 200';
const TO = '"wght" 780';

// The name sets itself once on load: each letter grows from hairline to heavy along
// Plus Jakarta Sans's weight axis, left to right.
export default function Hero() {
  let index = 0;

  return (
    <section className={`page ${styles.hero}`} aria-labelledby="hero-name">
      <h1 id="hero-name" className={styles.name} aria-label={profile.name}>
        {profile.nameLines.map((line) => (
          <span key={line} className={styles.line} aria-hidden="true">
            {[...line].map((char, i) => {
              const delay = 0.12 + index++ * 0.035;
              return (
                <motion.span
                  key={i}
                  className={styles.char}
                  initial={{ fontVariationSettings: FROM, opacity: 0.25 }}
                  animate={{ fontVariationSettings: TO, opacity: 1 }}
                  transition={{
                    fontVariationSettings: { duration: 1.25, ease: [0.22, 1, 0.36, 1], delay },
                    opacity: { duration: 0.5, delay },
                  }}
                >
                  {char === " " ? " " : char}
                </motion.span>
              );
            })}
          </span>
        ))}
      </h1>

      <motion.div
        className={styles.lede}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.9 }}
      >
        <p className={styles.description}>{profile.description}</p>
        <ul className={styles.links}>
          <li>
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
          </li>
          <li>
            <a href={profile.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </li>
          <li>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </li>
        </ul>
      </motion.div>
    </section>
  );
}
