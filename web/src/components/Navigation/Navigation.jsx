import { useEffect, useState } from "react";
import { Link } from "react-router";
import logoDark from "../../assets/branding/logo-dark.png";
import logoLight from "../../assets/branding/logo-light.png";
import ThemeToggle from "../ThemeToggle/ThemeToggle.jsx";
import styles from "./Navigation.module.css";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMenuOpen) {
      return undefined;
    }

    function closeOnEscape(event) {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("keydown", closeOnEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <>
      <header className={styles.navigation}>
        <Link className={styles.logo} to="/" aria-label="Greenhouse — Accueil">
          <img
            className={`${styles.logoMark} ${styles.logoLight}`}
            src={logoLight}
            alt=""
          />
          <img
            className={`${styles.logoMark} ${styles.logoDark}`}
            src={logoDark}
            alt=""
          />
        </Link>

        <div className={styles.actions}>
          <SearchField />
          <NewButton />
          <ThemeToggle />
        </div>

        <button
          className={styles.menuButton}
          type="button"
          aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          <span className={isMenuOpen ? styles.menuIconOpen : styles.menuIcon} />
        </button>
      </header>

      <button
        className={`${styles.backdrop} ${isMenuOpen ? styles.backdropVisible : ""}`}
        type="button"
        aria-label="Fermer le menu"
        tabIndex={isMenuOpen ? 0 : -1}
        onClick={() => setIsMenuOpen(false)}
      />

      <aside
        id="mobile-navigation"
        className={`${styles.mobileMenu} ${isMenuOpen ? styles.mobileMenuOpen : ""}`}
        aria-hidden={!isMenuOpen}
        inert={!isMenuOpen}
      >
        <div className={styles.mobileMenuHeader}>
          <span className={styles.mobileMenuTitle}>Menu</span>
          <button
            className={styles.closeButton}
            type="button"
            aria-label="Fermer le menu"
            onClick={() => setIsMenuOpen(false)}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 5l14 14M19 5 5 19" />
            </svg>
          </button>
        </div>

        <div className={styles.mobileMenuContent}>
          <SearchField />
          <NewButton />
          <div className={styles.themeRow}>
            <span>Thème</span>
            <ThemeToggle />
          </div>
        </div>
      </aside>
    </>
  );
}

function SearchField() {
  return (
    <label className={styles.search}>
      <span className={styles.visuallyHidden}>Rechercher un client</span>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="11" cy="11" r="7" />
        <path d="m16 16 5 5" />
      </svg>
      <input
        type="search"
        placeholder="Rechercher un client"
        aria-label="Rechercher un client"
      />
    </label>
  );
}

function NewButton() {
  return (
    <button
      className={styles.newButton}
      type="button"
      disabled
      title="Les actions de création seront ajoutées prochainement"
    >
      + Nouveau
    </button>
  );
}
