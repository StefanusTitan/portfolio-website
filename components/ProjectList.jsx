import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { projects } from "../data/projects";
import section from "./Section.module.css";
import styles from "./ProjectList.module.css";

// On devices with a precise pointer, hovering a row shows its cover beside the cursor.
function useFinePointer() {
  const [fine, setFine] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setFine(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return fine;
}

export default function ProjectList() {
  const fine = useFinePointer();
  const [hovered, setHovered] = useState(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 380, damping: 34, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 380, damping: 34, mass: 0.6 });

  const onMove = (event) => {
    x.set(event.clientX);
    y.set(event.clientY);
  };

  const preview = projects.find((p) => p.slug === hovered);

  return (
    <section id="projects" className={`page ${section.section}`} aria-labelledby="projects-title">
      <h2 id="projects-title" className={section.heading}>
        Projects
      </h2>

      <ul className={styles.list} onPointerMove={fine ? onMove : undefined} onPointerLeave={() => setHovered(null)}>
        {projects.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/projects/${p.slug}`}
              className={styles.row}
              onPointerEnter={(event) => {
                if (!fine) return;
                // Rows can slide under a still pointer while scrolling, before any move event.
                x.jump(event.clientX);
                y.jump(event.clientY);
                springX.jump(event.clientX);
                springY.jump(event.clientY);
                setHovered(p.slug);
              }}
              onFocus={() => setHovered(null)}
            >
              <span className={styles.thumb}>
                <Image src={p.cover.src} alt="" width={p.cover.width} height={p.cover.height} sizes="(max-width: 719px) 100vw, 1px" />
              </span>
              <span className={styles.title}>{p.title}</span>
              <span className={styles.summary}>{p.summary}</span>
              <span className={styles.meta}>
                <span>{p.kind}</span>
                <span>{p.stack}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {fine && (
        <motion.div className={styles.floating} style={{ x: springX, y: springY }} aria-hidden="true">
          <AnimatePresence>
            {preview && (
              <motion.div
                key={preview.slug}
                className={styles.floatingInner}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image src={preview.cover.src} alt="" width={preview.cover.width} height={preview.cover.height} sizes="360px" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </section>
  );
}
