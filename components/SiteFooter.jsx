import { profile } from "../data/profile";
import styles from "./SiteFooter.module.css";

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={`page ${styles.row}`}>
        <p>© {new Date().getFullYear()} {profile.name}</p>
        <p>{profile.location}</p>
      </div>
    </footer>
  );
}
