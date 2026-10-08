import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLenis } from "lenis/react";
import Schematic from "./Schematic";
import styles from "./Systems.module.css";

function SystemDetail({ system }) {
  return (
    <motion.article
      className={styles.detail}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
    >
      <header className={styles.detailHead}>
        <h4 className={styles.detailName}>{system.name}</h4>
        <p className={styles.summary}>{system.summary}</p>
      </header>

      {system.diagram && (
        <div className={styles.visual}>
          <Schematic diagram={system.diagram} title={`How ${system.name.toLowerCase()} works`} />
        </div>
      )}

      <div className={styles.body}>
        {system.body.map((p) => (
          <p key={p.slice(0, 24)}>{p}</p>
        ))}
      </div>

      <dl className={styles.meta}>
        <div>
          <dt>Built with</dt>
          <dd>{system.stack}</dd>
        </div>
        <div>
          <dt>When</dt>
          <dd>{system.period}, 2026</dd>
        </div>
      </dl>
    </motion.article>
  );
}

export default function Systems({ systems }) {
  const [activeId, setActiveId] = useState(systems[0].id);
  const tabs = useRef({});
  const panel = useRef(null);
  const lenis = useLenis();
  const active = systems.find((s) => s.id === activeId);

  const select = (id, focus = false) => {
    setActiveId(id);
    const tab = tabs.current[id];
    if (focus) tab?.focus();
    // On the phone layout the tabs scroll sideways; keep the chosen one visible.
    tab?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
    // If the reader is deep inside a long panel, bring the new one's top into view.
    const top = panel.current?.getBoundingClientRect().top ?? 0;
    if (top < 0) {
      if (lenis) lenis.scrollTo(panel.current, { offset: -96 });
      else panel.current.scrollIntoView({ block: "start" });
    }
  };

  const onKeyDown = (event) => {
    const index = systems.findIndex((s) => s.id === activeId);
    const keys = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
    let next = null;
    if (event.key in keys) next = (index + keys[event.key] + systems.length) % systems.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = systems.length - 1;
    if (next === null) return;
    event.preventDefault();
    select(systems[next].id, true);
  };

  return (
    <div className={styles.systems}>
      <div className={styles.rail}>
        <h3 className={styles.railTitle} id="systems-title">
          Things I worked on
        </h3>
        <div role="tablist" aria-labelledby="systems-title" className={styles.tabs} onKeyDown={onKeyDown}>
          {systems.map((s) => {
            const selected = s.id === activeId;
            return (
              <button
                key={s.id}
                ref={(el) => (tabs.current[s.id] = el)}
                role="tab"
                type="button"
                id={`tab-${s.id}`}
                aria-selected={selected}
                aria-controls="system-panel"
                tabIndex={selected ? 0 : -1}
                className={styles.tab}
                onClick={() => select(s.id)}
              >
                {selected && (
                  <motion.span
                    layoutId="system-marker"
                    className={styles.marker}
                    transition={{ type: "spring", bounce: 0.18, duration: 0.5 }}
                  />
                )}
                <span className={styles.tabName}>{s.name}</span>
                <span className={styles.tabPeriod}>{s.period}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div
        ref={panel}
        role="tabpanel"
        id="system-panel"
        aria-labelledby={`tab-${activeId}`}
        className={styles.panel}
        tabIndex={0}
      >
        <AnimatePresence mode="wait" initial={false}>
          <SystemDetail key={active.id} system={active} />
        </AnimatePresence>
      </div>
    </div>
  );
}
