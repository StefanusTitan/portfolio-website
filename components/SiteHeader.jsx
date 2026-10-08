import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useLenis } from "lenis/react";
import ThemeToggle from "./ThemeToggle";
import styles from "./SiteHeader.module.css";

const sections = [
  { id: "work", label: "Work" },
  { id: "projects", label: "Projects" },
  { id: "background", label: "Background" },
  { id: "contact", label: "Contact" },
];

export default function SiteHeader() {
  const { pathname } = useRouter();
  const onHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [current, setCurrent] = useState(null);
  const lenis = useLenis();

  // On the home page the header scrolls to sections itself, so Next's hash jump
  // and Lenis don't both try to move the page. Elsewhere, Link navigates to /#id.
  const scrollTo = (event, id) => {
    if (!onHome) return;
    const target = id ? document.getElementById(id) : null;
    if (id && !target) return;
    event.preventDefault();
    const header = document.querySelector("header")?.offsetHeight ?? 0;
    const top = target ? target.getBoundingClientRect().top + window.scrollY - header : 0;
    if (lenis) {
      lenis.scrollTo(top, { duration: 1.1 });
    } else {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
    }
    // Keep Next's history state so back and forward still work.
    window.history.replaceState(window.history.state, "", id ? `#${id}` : "/");
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // On the home page, marks the section that crosses the upper third of the viewport.
  useEffect(() => {
    if (!onHome) return;
    const nodes = sections.map((s) => document.getElementById(s.id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setCurrent(entry.target.id);
        });
      },
      { rootMargin: "-30% 0px -65% 0px" }
    );
    nodes.forEach((n) => observer.observe(n));
    const onTop = () => {
      if (window.scrollY < 200) setCurrent(null);
      // Contact is too short to reach the marker band, so the page end selects it.
      else if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) setCurrent("contact");
    };
    window.addEventListener("scroll", onTop, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onTop);
    };
  }, [onHome]);

  // Project pages live under Projects, so that link stays marked there.
  const active = onHome ? current : pathname.startsWith("/projects") ? "projects" : null;

  return (
    <header className={styles.header} data-scrolled={scrolled || undefined}>
      <div className={`page ${styles.bar}`}>
        <Link href="/" className={styles.home} onClick={(event) => scrollTo(event, null)}>
          Stefanus Titan
        </Link>
        <nav aria-label="Sections" className={styles.nav}>
          <ul>
            {sections.map((s) => (
              <li key={s.id}>
                <Link
                  href={onHome ? `#${s.id}` : `/#${s.id}`}
                  className={styles.link}
                  aria-current={active === s.id ? "true" : undefined}
                  onClick={(event) => scrollTo(event, s.id)}
                >
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
