import { useEffect, useState } from "react";
import { Link } from "react-router";
import { getClients } from "../../../services/clients/clients.api.js";
import styles from "./Clients.module.css";
import ClientCards from "./sections/ClientCards/ClientCards.jsx";

function normalizeText(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

export default function ClientsPage() {
  const [clients, setClients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const normalizedSearch = normalizeText(searchTerm.trim());
  const filteredClients = normalizedSearch
    ? clients.filter((client) =>
        normalizeText(`${client.firstName} ${client.lastName}`).includes(normalizedSearch),
      )
    : clients;

  useEffect(() => {
    const controller = new AbortController();

    async function loadClients() {
      try {
        const clientList = await getClients(controller.signal);
        setClients(clientList);
      } catch (error) {
        if (error.name !== "AbortError") {
          setErrorMessage(error.message || "Impossible de récupérer les clients.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    loadClients();

    return () => controller.abort();
  }, []);

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Suivi</p>
          <h1>Clients</h1>
          <p className={styles.summary}>{clients.length} clients enregistrés</p>
        </div>

        <Link className={styles.addLink} to="/clients/new">
          + Ajouter
        </Link>
      </header>

      <label className={styles.search}>
        <span className={styles.visuallyHidden}>Rechercher un client par son nom ou son prénom</span>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="11" cy="11" r="7" />
          <path d="m16 16 5 5" />
        </svg>
        <input
          type="search"
          value={searchTerm}
          placeholder="Rechercher par nom ou prénom"
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </label>

      {isLoading && <p className={styles.state} role="status">Chargement des clients...</p>}
      {!isLoading && errorMessage && <p className={styles.error} role="alert">{errorMessage}</p>}
      {!isLoading && !errorMessage && <ClientCards clients={filteredClients} />}
    </main>
  );
}
