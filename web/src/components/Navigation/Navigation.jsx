import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import logoDark from "../../assets/branding/logo-dark.png";
import logoLight from "../../assets/branding/logo-light.png";
import ThemeToggle from "../ThemeToggle/ThemeToggle.jsx";
import { clients } from "./Navigation.data.js";
import styles from "./Navigation.module.css";

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
          <SearchTrigger onClick={openSearch} />
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
          <SearchTrigger onClick={openSearch} />
          <NewButton />
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

function SearchTrigger({ onClick }) {
  return (
    <button className={styles.search} type="button" onClick={onClick}>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="11" cy="11" r="7" />
        <path d="m16 16 5 5" />
      </svg>
      <span>Rechercher un client</span>
    </button>
  );
}

function ClientSearchModal({ onClose }) {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const normalizedSearch = normalizeText(searchTerm.trim());
  const filteredClients = normalizedSearch
    ? clients.filter(({ firstName, lastName }) =>
        normalizeText(`${firstName} ${lastName}`).includes(normalizedSearch),
      )
    : [];

  function openClient(clientId) {
    onClose();
    navigate(`/clients/${clientId}`);
  }

  return (
    <div className={styles.searchModalBackdrop} onMouseDown={onClose}>
      <section
        className={styles.searchModal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="client-search-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className={styles.searchModalHeader}>
          <h2 id="client-search-title">Rechercher un client</h2>
          <button
            className={styles.closeButton}
            type="button"
            aria-label="Fermer la recherche"
            onClick={onClose}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 5l14 14M19 5 5 19" />
            </svg>
          </button>
        </div>

        <label className={styles.modalSearchField}>
          <span className={styles.visuallyHidden}>Nom ou prénom du client</span>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="m16 16 5 5" />
          </svg>
          <input
            type="search"
            value={searchTerm}
            placeholder="Nom ou prénom"
            autoFocus
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </label>

        <div className={styles.searchResults}>
          {!normalizedSearch ? null : filteredClients.length > 0 ? (
            <ul>
              {filteredClients.map((client) => (
                <li key={client.id}>
                  <button
                    type="button"
                    onClick={() => openClient(client.id)}
                  >
                    {client.firstName} {client.lastName}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.emptyResult}>Aucun client trouvé.</p>
          )}
        </div>
      </section>
    </div>
  );
}

function normalizeText(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
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
