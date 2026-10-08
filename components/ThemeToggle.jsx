import { useSyncExternalStore } from "react";
import styles from "./ThemeToggle.module.css";

// The theme lives on <html data-theme>, set before paint by the script in _document.
// Reading it as an external store keeps this button in sync without copying it into state.
const subscribe = (onChange) => {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
};
const getTheme = () => document.documentElement.dataset.theme || "light";
const getServerTheme = () => null;

export default function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getTheme, getServerTheme);
  const next = theme === "dark" ? "light" : "dark";

  const toggle = () => {
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Storage can be blocked; the theme still applies for this visit.
    }
  };

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={toggle}
      aria-label={theme ? `Switch to ${next} theme` : "Switch theme"}
      title={theme ? `Switch to ${next} theme` : undefined}
    >
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
        <circle cx="12" cy="12" r="8.25" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 3.75a8.25 8.25 0 0 1 0 16.5z" fill="currentColor" className={styles.half} />
      </svg>
    </button>
  );
}
