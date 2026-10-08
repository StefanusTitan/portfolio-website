import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { profile } from "../data/profile";
import section from "./Section.module.css";
import styles from "./Contact.module.css";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section id="contact" className={`page ${section.section} ${styles.contact}`} aria-labelledby="contact-title">
      <h2 id="contact-title" className={section.heading}>
        Contact
      </h2>
      <p className={styles.lead}>
        Email is the quickest way to reach me. Happy to chat about a role, an AI idea for your business, or just
        how you work with coding agents.
      </p>

      <a href={`mailto:${profile.email}`} className={styles.email}>
        {profile.email}
      </a>

      <div className={styles.actions}>
        <button type="button" className={styles.copy} onClick={copy} aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={copied ? "done" : "idle"}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
            >
              {copied ? "Address copied" : "Copy address"}
            </motion.span>
          </AnimatePresence>
        </button>
        <a href={profile.github} target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
      </div>
    </section>
  );
}
