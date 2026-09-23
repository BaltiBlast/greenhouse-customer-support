import useTheme from "../../../../theme/useTheme.js";
import styles from "./ThemeToggle.module.css";

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.5 14.3A8.4 8.4 0 0 1 9.7 3.5 8.5 8.5 0 1 0 20.5 14.3Z" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  const nextTheme = isDark ? "light" : "dark";
  const label = isDark ? "Passer au thème clair" : "Passer au thème sombre";

  return (
    <button
      className={styles.toggle}
      type="button"
      aria-label={label}
      title={label}
      onClick={() => setTheme(nextTheme)}
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
