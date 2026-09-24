import { useState } from "react";
import { Link } from "react-router";
import clients from "../../../data/clients.data.js";
import styles from "./Clients.module.css";
import ClientCards from "./sections/ClientCards/ClientCards.jsx";

function normalizeText(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

export default function ClientsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const normalizedSearch = normalizeText(searchTerm.trim());
  const filteredClients = normalizedSearch
    ? clients.filter((client) =>
        normalizeText(`${client.firstName} ${client.lastName}`).includes(normalizedSearch),
      )
    : clients;

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

      <ClientCards clients={filteredClients} />
    </main>
  );
}
