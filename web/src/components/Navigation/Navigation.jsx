import { useEffect, useState } from "react";
import { Link } from "react-router";
import logoDark from "../../assets/branding/logo-dark.png";
import logoLight from "../../assets/branding/logo-light.png";
import styles from "./Navigation.module.css";
import AddMenu from "./sections/AddMenu/AddMenu.jsx";
import ClientSearchModal from "./sections/ClientSearchModal/ClientSearchModal.jsx";
import ThemeToggle from "./sections/ThemeToggle/ThemeToggle.jsx";

function SearchTrigger({ compact = false, onClick }) {
  return (
    <button
      className={`${styles.search} ${compact ? styles.compactAction : ""}`}
      type="button"
      aria-label="Rechercher un client"
      onClick={onClick}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="11" cy="11" r="7" />
        <path d="m16 16 5 5" />
      </svg>
      {!compact && <span>Rechercher un client</span>}
    </button>
  );
}

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    if (!isMenuOpen && !isSearchOpen) {
      return undefined;
    }

    function closeOnEscape(event) {
      if (event.key === "Escape") {
        if (isSearchOpen) {
          setIsSearchOpen(false);
        } else {
          setIsMenuOpen(false);
        }
      }
    }

    document.addEventListener("keydown", closeOnEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.body.style.overflow = "";
    };
  }, [isMenuOpen, isSearchOpen]);

  function openSearch() {
    setIsMenuOpen(false);
    setIsSearchOpen(true);
  }

  return (
    <>
      <header className={styles.navigation}>
        <Link className={styles.logo} to="/" aria-label="Greenhouse : accueil">
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
          <SearchTrigger onClick={openSearch} />
          <AddMenu />
          <ThemeToggle />
        </div>

        <div className={styles.mobileActions}>
          <SearchTrigger compact onClick={openSearch} />
          <AddMenu compact />
          <button
            className={styles.menuButton}
            type="button"
            aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsMenuOpen((current) => !current)}
          >
            <span
              className={isMenuOpen ? styles.menuIconOpen : styles.menuIcon}
            />
          </button>
        </div>
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
          <div className={styles.themeRow}>
            <span>Thème</span>
            <ThemeToggle />
          </div>
        </div>
      </aside>

      {isSearchOpen && (
        <ClientSearchModal onClose={() => setIsSearchOpen(false)} />
      )}
    </>
  );
}
