import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import useAuth from "../../auth/useAuth.js";
import logoDark from "../../assets/branding/logo-dark.png";
import logoLight from "../../assets/branding/logo-light.png";
import styles from "./Navigation.module.css";
import ClientSearchModal from "./sections/ClientSearchModal/ClientSearchModal.jsx";
import ThemeToggle from "./sections/ThemeToggle/ThemeToggle.jsx";

function getNavigationLinkClass({ isActive }) {
  return `${styles.navigationLink} ${isActive ? styles.navigationLinkActive : ""}`;
}

function SearchTrigger({ onClick }) {
  return (
    <button
      className={styles.search}
      type="button"
      aria-label="Rechercher un client"
      onClick={onClick}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="11" cy="11" r="7" />
        <path d="m16 16 5 5" />
      </svg>
      <span>Rechercher un client</span>
    </button>
  );
}

export default function Navigation() {
  const { logout, user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

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

  async function handleLogout() {
    setIsLoggingOut(true);

    try {
      await logout();
      setIsMenuOpen(false);
    } finally {
      setIsLoggingOut(false);
    }
  }

  return (
    <>
      <header className={styles.navigation}>
        <div className={styles.mainNavigation}>
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

        </div>

        <div className={styles.actions}>
          <SearchTrigger onClick={openSearch} />
          <button
            className={styles.menuButton}
            type="button"
            aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={isMenuOpen}
            aria-controls="navigation-menu"
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
        id="navigation-menu"
        className={`${styles.menuPanel} ${isMenuOpen ? styles.menuPanelOpen : ""}`}
        aria-hidden={!isMenuOpen}
        inert={!isMenuOpen}
      >
        <div className={styles.menuHeader}>
          <div>
            <span className={styles.menuTitle}>Menu</span>
            <p className={styles.greeting}>Salut {user.firstName}</p>
          </div>
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

        <div className={styles.menuContent}>
          <section className={styles.menuSection}>
            <h2>Navigation</h2>
            <nav className={styles.menuLinks} aria-label="Navigation principale">
              <NavLink
                className={getNavigationLinkClass}
                to="/"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </NavLink>
              <NavLink
                className={getNavigationLinkClass}
                to="/clients"
                onClick={() => setIsMenuOpen(false)}
              >
                Clients
              </NavLink>
            </nav>
          </section>

          <section className={styles.menuSection}>
            <h2>Ajouter</h2>
            <div className={styles.menuLinks}>
              <Link to="/events/new" onClick={() => setIsMenuOpen(false)}>
                + Événement
              </Link>
              <Link to="/clients/new" onClick={() => setIsMenuOpen(false)}>
                + Client
              </Link>
            </div>
          </section>

          <div className={styles.themeRow}>
            <span>Thème</span>
            <ThemeToggle />
          </div>

          <button
            className={styles.logoutButton}
            type="button"
            disabled={isLoggingOut}
            onClick={handleLogout}
          >
            {isLoggingOut ? "Déconnexion..." : "Se déconnecter"}
          </button>
        </div>
      </aside>

      {isSearchOpen && (
        <ClientSearchModal onClose={() => setIsSearchOpen(false)} />
      )}
    </>
  );
}
