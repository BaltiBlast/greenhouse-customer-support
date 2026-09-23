import { useState } from "react";
import formStyles from "../../styles/Form.module.css";
import { clients, eventTypes } from "./EventCreate.data.js";

export default function EventCreatePage() {
  const [eventType, setEventType] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <main className={formStyles.page}>
      <header className={formStyles.header}>
        <p className={formStyles.eyebrow}>Planning</p>
        <h1>Ajouter un événement</h1>
      </header>

      <form className={formStyles.form} onSubmit={handleSubmit}>
        <fieldset className={formStyles.section}>
          <h2>Informations générales</h2>
          <div className={formStyles.grid}>
            <label>
              <span>Type d’événement <span className={formStyles.required}>*</span></span>
              <select
                name="type"
                value={eventType}
                required
                onChange={(event) => setEventType(event.target.value)}
              >
                <option value="">Sélectionner un type</option>
                {eventTypes.map((type) => (
                  <option value={type.value} key={type.value}>{type.label}</option>
                ))}
              </select>
            </label>

            <label>
              <span>Date <span className={formStyles.required}>*</span></span>
              <input type="date" name="date" required />
            </label>

            <label>
              <span>Heure de début <span className={formStyles.required}>*</span></span>
              <input type="time" name="startTime" required />
            </label>

            <label>
              <span>Durée (minutes) <span className={formStyles.required}>*</span></span>
              <input type="number" name="duration" min="1" step="1" inputMode="numeric" required />
            </label>

            <label>
              <span>Lieu <span className={formStyles.required}>*</span></span>
              <input type="text" name="location" required />
            </label>
          </div>

          <label>
            <span>Description <span className={formStyles.required}>*</span></span>
            <textarea name="description" rows="5" required />
          </label>
        </fieldset>

        {eventType === "coaching" && (
          <fieldset className={formStyles.section}>
            <h2>Coaching individuel</h2>
            <div className={formStyles.grid}>
              <label>
                <span>Client <span className={formStyles.required}>*</span></span>
                <select name="clientId" defaultValue="" required>
                  <option value="">Sélectionner un client</option>
                  {clients.map((client) => (
                    <option value={client.id} key={client.id}>{client.name}</option>
                  ))}
                </select>
              </label>
            </div>

          </fieldset>
        )}

        {eventType === "group-class" && (
          <fieldset className={formStyles.section}>
            <h2>Cours collectif</h2>
            <div className={formStyles.grid}>
              <label>
                <span>Nom du cours <span className={formStyles.required}>*</span></span>
                <input type="text" name="className" required />
              </label>
            </div>
          </fieldset>
        )}

        <div className={formStyles.actions}>
          <button className={formStyles.submitButton} type="submit">
            Enregistrer l’événement
          </button>
        </div>
      </form>
    </main>
  );
}
