import { useState } from "react";
import formStyles from "../../styles/Form.module.css";
import styles from "./ClientCreate.module.css";

export default function ClientCreatePage() {
  const [pathologies, setPathologies] = useState([""]);

  function updatePathology(index, value) {
    setPathologies((currentPathologies) =>
      currentPathologies.map((pathology, pathologyIndex) =>
        pathologyIndex === index ? value : pathology,
      ),
    );
  }

  function addPathology() {
    if (!pathologies.at(-1).trim()) {
      return;
    }

    setPathologies((currentPathologies) => [...currentPathologies, ""]);
  }

  function removePathology(index) {
    setPathologies((currentPathologies) =>
      currentPathologies.filter((_, pathologyIndex) => pathologyIndex !== index),
    );
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <main className={formStyles.page}>
      <header className={formStyles.header}>
        <p className={formStyles.eyebrow}>Clients</p>
        <h1>Ajouter un client</h1>
      </header>

      <form className={formStyles.form} onSubmit={handleSubmit}>
        <fieldset className={formStyles.section}>
          <h2>Identité</h2>
          <div className={formStyles.grid}>
            <label><span>Prénom <span className={formStyles.required}>*</span></span><input type="text" name="firstName" autoComplete="given-name" required /></label>
            <label><span>Nom <span className={formStyles.required}>*</span></span><input type="text" name="lastName" autoComplete="family-name" required /></label>
            <label><span>Date de naissance <span className={formStyles.required}>*</span></span><input type="date" name="birthDate" autoComplete="bday" required /></label>
          </div>
        </fieldset>

        <fieldset className={formStyles.section}>
          <h2>Mesures</h2>
          <div className={formStyles.grid}>
            <label><span>Taille (cm) <span className={formStyles.required}>*</span></span><input type="number" name="height" min="1" step="1" inputMode="numeric" required /></label>
            <label><span>Poids (kg) <span className={formStyles.required}>*</span></span><input type="number" name="weight" min="1" step="0.1" inputMode="decimal" required /></label>
            <label><span>Masse grasse (%) <span className={formStyles.optional}>(optionnel)</span></span><input type="number" name="bodyFat" min="0" max="100" step="0.1" inputMode="decimal" /></label>
            <label><span>Masse musculaire (kg) <span className={formStyles.optional}>(optionnel)</span></span><input type="number" name="muscleMass" min="0" step="0.1" inputMode="decimal" /></label>
          </div>
        </fieldset>

        <fieldset className={formStyles.section}>
          <h2>Accompagnement</h2>
          <label><span>Objectifs <span className={formStyles.optional}>(optionnel)</span></span><textarea name="objectives" rows="4" /></label>

          <div className={styles.pathologies}>
            <div className={styles.sectionHeading}>
              <div>
                <h3>Pathologies déclarées</h3>
              </div>
              <button
                className={formStyles.secondaryButton}
                type="button"
                disabled={!pathologies.at(-1).trim()}
                onClick={addPathology}
              >
                + Ajouter
              </button>
            </div>

            {pathologies.map((pathology, index) => (
              <div className={styles.dynamicField} key={index}>
                <label>
                  <span>Pathologie {index + 1} <span className={formStyles.optional}>(optionnel)</span></span>
                  <input type="text" name="pathologies" value={pathology} onChange={(event) => updatePathology(index, event.target.value)} />
                </label>
                {pathologies.length > 1 && (
                  <button className={`${formStyles.secondaryButton} ${styles.removeButton}`} type="button" aria-label={`Supprimer la pathologie ${index + 1}`} onClick={() => removePathology(index)}>Supprimer</button>
                )}
              </div>
            ))}
          </div>

          <label><span>Blessures ou limitations <span className={formStyles.optional}>(optionnel)</span></span><textarea name="limitations" rows="3" /></label>
          <label className={formStyles.checkbox}><input type="checkbox" name="hasEatingDisorder" />Trouble alimentaire signalé <span className={formStyles.optional}>(optionnel)</span></label>
        </fieldset>

        <fieldset className={formStyles.section}>
          <h2>Contact d’urgence</h2>
          <div className={formStyles.grid}>
            <label><span>Nom complet <span className={formStyles.optional}>(optionnel)</span></span><input type="text" name="emergencyContactName" /></label>
            <label><span>Lien avec le client <span className={formStyles.optional}>(optionnel)</span></span><input type="text" name="emergencyContactRelationship" /></label>
            <label><span>Téléphone <span className={formStyles.optional}>(optionnel)</span></span><input type="tel" name="emergencyContactPhone" autoComplete="tel" /></label>
          </div>
        </fieldset>

        <div className={formStyles.actions}>
          <button className={formStyles.submitButton} type="submit">Enregistrer le client</button>
        </div>
      </form>
    </main>
  );
}
