import { useState } from "react";
import { createClient } from "../../services/clients/clients.api.js";
import formStyles from "../../styles/Form.module.css";
import styles from "./ClientCreate.module.css";

function getOptionalNumber(formData, fieldName) {
  const value = formData.get(fieldName);
  return value === "" ? undefined : Number(value);
}

function FieldError({ message }) {
  return message ? <span className={formStyles.fieldError}>{message}</span> : null;
}

export default function ClientCreatePage() {
  const [pathologies, setPathologies] = useState([""]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});

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

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const clientData = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      birthDate: formData.get("birthDate"),
      height: Number(formData.get("height")),
      weight: Number(formData.get("weight")),
      bodyFat: getOptionalNumber(formData, "bodyFat"),
      muscleMass: getOptionalNumber(formData, "muscleMass"),
      objectives: formData.get("objectives"),
      pathologies,
      limitations: formData.get("limitations"),
      hasEatingDisorder: formData.has("hasEatingDisorder"),
      emergencyContactName: formData.get("emergencyContactName"),
      emergencyContactRelationship: formData.get("emergencyContactRelationship"),
      emergencyContactPhone: formData.get("emergencyContactPhone"),
    };

    setIsSubmitting(true);
    setFeedback(null);
    setFieldErrors({});

    try {
      await createClient(clientData);
      form.reset();
      setPathologies([""]);
      setFeedback({ type: "success", message: "Le client a bien été créé." });
    } catch (error) {
      const nextFieldErrors = {};

      if (Array.isArray(error.data?.errors)) {
        error.data.errors.forEach(({ field, message }) => {
          if (field && !nextFieldErrors[field]) {
            nextFieldErrors[field] = message;
          }
        });
      }

      setFieldErrors(nextFieldErrors);
      setFeedback({
        type: "error",
        message: error.message || "Impossible d’envoyer les données du client.",
      });
    } finally {
      setIsSubmitting(false);
    }
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
            <label><span>Prénom <span className={formStyles.required}>*</span></span><input type="text" name="firstName" autoComplete="given-name" required /><FieldError message={fieldErrors.firstName} /></label>
            <label><span>Nom <span className={formStyles.required}>*</span></span><input type="text" name="lastName" autoComplete="family-name" required /><FieldError message={fieldErrors.lastName} /></label>
            <label><span>Date de naissance <span className={formStyles.required}>*</span></span><input type="date" name="birthDate" autoComplete="bday" required /><FieldError message={fieldErrors.birthDate} /></label>
          </div>
        </fieldset>

        <fieldset className={formStyles.section}>
          <h2>Mesures</h2>
          <div className={formStyles.grid}>
            <label><span>Taille (cm) <span className={formStyles.required}>*</span></span><input type="number" name="height" min="1" step="1" inputMode="numeric" required /><FieldError message={fieldErrors.height} /></label>
            <label><span>Poids (kg) <span className={formStyles.required}>*</span></span><input type="number" name="weight" min="1" step="0.1" inputMode="decimal" required /><FieldError message={fieldErrors.weight} /></label>
            <label><span>Masse grasse (%) <span className={formStyles.optional}>(optionnel)</span></span><input type="number" name="bodyFat" min="0" max="100" step="0.1" inputMode="decimal" /><FieldError message={fieldErrors.bodyFat} /></label>
            <label><span>Masse musculaire (kg) <span className={formStyles.optional}>(optionnel)</span></span><input type="number" name="muscleMass" min="0" step="0.1" inputMode="decimal" /><FieldError message={fieldErrors.muscleMass} /></label>
          </div>
        </fieldset>

        <fieldset className={formStyles.section}>
          <h2>Accompagnement</h2>
          <label><span>Objectifs <span className={formStyles.optional}>(optionnel)</span></span><textarea name="objectives" rows="4" /><FieldError message={fieldErrors.objectives} /></label>

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
                  <FieldError
                    message={
                      fieldErrors[`pathologies.${index}`] ||
                      (index === 0 ? fieldErrors.pathologies : null)
                    }
                  />
                </label>
                {pathologies.length > 1 && (
                  <button className={`${formStyles.secondaryButton} ${styles.removeButton}`} type="button" aria-label={`Supprimer la pathologie ${index + 1}`} onClick={() => removePathology(index)}>Supprimer</button>
                )}
              </div>
            ))}
          </div>

          <label><span>Blessures ou limitations <span className={formStyles.optional}>(optionnel)</span></span><textarea name="limitations" rows="3" /><FieldError message={fieldErrors.limitations} /></label>
          <label className={formStyles.checkbox}><input type="checkbox" name="hasEatingDisorder" />Trouble alimentaire signalé <span className={formStyles.optional}>(optionnel)</span></label>
          <FieldError message={fieldErrors.hasEatingDisorder} />
        </fieldset>

        <fieldset className={formStyles.section}>
          <h2>Contact d’urgence</h2>
          <div className={formStyles.grid}>
            <label><span>Nom complet <span className={formStyles.optional}>(optionnel)</span></span><input type="text" name="emergencyContactName" /><FieldError message={fieldErrors.emergencyContactName} /></label>
            <label><span>Lien avec le client <span className={formStyles.optional}>(optionnel)</span></span><input type="text" name="emergencyContactRelationship" /><FieldError message={fieldErrors.emergencyContactRelationship} /></label>
            <label><span>Téléphone <span className={formStyles.optional}>(optionnel)</span></span><input type="tel" name="emergencyContactPhone" autoComplete="tel" /><FieldError message={fieldErrors.emergencyContactPhone} /></label>
          </div>
        </fieldset>

        <div className={formStyles.actions}>
          <button className={formStyles.submitButton} type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Envoi en cours..." : "Enregistrer le client"}
          </button>
        </div>

        {feedback && (
          <p
            className={`${formStyles.feedback} ${
              feedback.type === "error"
                ? formStyles.errorFeedback
                : formStyles.successFeedback
            }`}
            role={feedback.type === "error" ? "alert" : "status"}
          >
            {feedback.message}
          </p>
        )}
      </form>
    </main>
  );
}
