import { duluin, gentech } from "../data/work";
import Systems from "./Systems";
import section from "./Section.module.css";
import styles from "./Work.module.css";

function Roles({ roles }) {
  return (
    <ol className={styles.roles} data-count={roles.length}>
      {roles.map((r) => (
        <li key={r.title}>
          <span className={styles.roleTitle}>{r.title}</span>
          <span className={styles.rolePeriod}>{r.period}</span>
        </li>
      ))}
    </ol>
  );
}

function EntryHead({ company, location }) {
  return (
    <header className={styles.head}>
      <h3 className={styles.company}>{company}</h3>
      <p className={styles.location}>{location}</p>
    </header>
  );
}

export default function Work() {
  return (
    <section id="work" className={`page ${section.section}`} aria-labelledby="work-title">
      <h2 id="work-title" className={section.heading}>
        Work
      </h2>

      <article className={styles.entry}>
        <div className={section.split}>
          <EntryHead company={duluin.company} location={duluin.location} />
          <div className={styles.body}>
            <Roles roles={duluin.roles} />
            <div className={styles.prose}>
              {duluin.intro.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.systems}>
          <Systems systems={duluin.systems} />
        </div>

        <div className={`${section.split} ${styles.also}`}>
          <h4 className={styles.alsoTitle}>{duluin.alsoTitle}</h4>
          <ul className={styles.alsoList}>
            {duluin.also.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </article>

      <article className={`${styles.entry} ${styles.secondEntry}`}>
        <div className={section.split}>
          <EntryHead company={gentech.company} location={gentech.location} />
          <div className={styles.body}>
            <Roles roles={gentech.roles} />
            <ul className={styles.points}>
              {gentech.points.map((p) => (
                <li key={p.slice(0, 24)}>{p}</li>
              ))}
            </ul>
          </div>
        </div>
      </article>
    </section>
  );
}
