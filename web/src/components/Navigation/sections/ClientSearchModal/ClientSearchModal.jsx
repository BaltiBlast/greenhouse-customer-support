import { useState } from "react";
import { useNavigate } from "react-router";
import clients from "../../../../data/clients.data.js";
import styles from "./ClientSearchModal.module.css";

function normalizeText(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

export default function ClientSearchModal({ onClose }) {
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
    <div className={styles.backdrop} onMouseDown={onClose}>
      <section
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="client-search-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className={styles.header}>
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

        <label className={styles.searchField}>
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

        <div className={styles.results}>
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
