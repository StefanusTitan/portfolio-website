import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { motion } from "motion/react";
import Lightbox, { Media } from "../../components/Lightbox";
import { projects, getProject } from "../../data/projects";
import { profile } from "../../data/profile";
import section from "../../components/Section.module.css";
import styles from "../../styles/ProjectPage.module.css";

export default function ProjectPage({ slug }) {
  const project = getProject(slug);
  const index = projects.indexOf(project);
  const next = projects[(index + 1) % projects.length];
  const [open, setOpen] = useState(null);
  const close = () => setOpen(null);
  const hero = project.hero || project.cover;

  return (
    <>
      <Head>
        <title>{`${project.title}, a project by ${profile.name}`}</title>
        <meta name="description" content={project.summary} />
      </Head>

      <article className={`page ${styles.page}`}>
        <Link href="/#projects" className={styles.back}>
          Back to projects
        </Link>

        <header className={styles.header}>
          <p className={styles.kind}>{project.kind}</p>
          <h1 className={styles.title}>{project.title}</h1>
          <p className={styles.summary}>{project.summary}</p>
          <div className={styles.facts}>
            <p>
              <span className={styles.factLabel}>Built with</span> {project.stack}
            </p>
            <ul className={styles.links}>
              {project.links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} target="_blank" rel="noopener noreferrer">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </header>

        <figure className={styles.hero} data-type={hero.type}>
          <Media item={hero} className={styles.heroMedia} sizes="(max-width: 1240px) 100vw, 1160px" autoPlay priority />
        </figure>

        <div className={styles.sections}>
          {project.sections.map((s) => (
            <section key={s.heading} className={section.split}>
              <h2 className={styles.sectionHeading}>{s.heading}</h2>
              <div className={styles.sectionBody}>
                {s.body?.map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
                {s.list && (
                  <ul className={styles.list}>
                    {s.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          ))}

          <section className={section.split}>
            <h2 className={styles.sectionHeading}>{project.gallery.some((g) => g.type === "video") ? "Recordings" : "Screens"}</h2>
            <ul className={styles.gallery}>
              {project.gallery.map((item, i) => (
                <li key={item.src}>
                  <motion.button
                    type="button"
                    layoutId={`project-${item.src}`}
                    className={styles.thumb}
                    onClick={() => setOpen(i)}
                    aria-label={`Open ${item.alt}`}
                    transition={{ type: "spring", bounce: 0.12, duration: 0.5 }}
                  >
                    <Media item={item} className={styles.thumbMedia} sizes="(max-width: 719px) 100vw, 360px" />
                  </motion.button>
                  <p className={styles.thumbCaption}>{item.alt}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <nav className={styles.next} aria-label="Next project">
          <Link href={`/projects/${next.slug}`} className={styles.nextLink}>
            <span className={styles.nextLabel}>Next project</span>
            <span className={styles.nextTitle}>{next.title}</span>
          </Link>
        </nav>
      </article>

      <Lightbox items={project.gallery} index={open} onChange={setOpen} onClose={close} idPrefix="project" />
    </>
  );
}

export function getStaticPaths() {
  return { paths: projects.map((p) => ({ params: { slug: p.slug } })), fallback: false };
}

export function getStaticProps({ params }) {
  return { props: { slug: params.slug } };
}
