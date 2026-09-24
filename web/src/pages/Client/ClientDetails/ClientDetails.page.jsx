import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { Link, useParams } from "react-router";
import clients from "../../../data/clients.data.js";
import formStyles from "../../../styles/Form.module.css";
import formConfig from "./ClientDetails.form.js";
import styles from "./ClientDetails.module.css";
import utils from "./ClientDetails.utils.js";

function FieldError({ message }) {
  return message ? <span className={formStyles.fieldError}>{message}</span> : null;
}

export default function ClientDetailsPage() {
  const { clientId } = useParams();
  const initialClient = clients.find((client) => client.id === clientId);
  const [client, setClient] = useState(initialClient);
  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    reset,
    watch,
  } = useForm({
    defaultValues: initialClient ? utils.getFormValues(initialClient) : formConfig.defaultValues,
  });
  const { append, fields, remove } = useFieldArray({ control, name: "pathologies" });
  const pathologies = watch("pathologies");
  const canAddPathology = Boolean(pathologies?.at(-1)?.value?.trim());

  if (!client) {
    return (
      <main className={styles.notFound}>
        <p>Ce client est introuvable.</p>
        <Link to="/clients">Revenir aux clients</Link>
      </main>
    );
  }

  function cancelEditing() {
    reset(utils.getFormValues(client));
    setIsEditing(false);
    setSuccessMessage(null);
  }

  function saveClient(data) {
    const updatedClient = utils.getUpdatedClient(client, data);

    setClient(updatedClient);
    reset(utils.getFormValues(updatedClient));
    setIsEditing(false);
    setSuccessMessage("Les modifications ont été enregistrées localement.");
  }

  return (
    <main className={formStyles.page}>
      <Link className={styles.backLink} to="/clients">Retour aux clients</Link>

      <header className={`${formStyles.header} ${styles.header}`}>
        <div>
          <p className={formStyles.eyebrow}>Fiche client</p>
          <h1>{client.firstName} {client.lastName}</h1>
        </div>

        {!isEditing && (
          <button className={formStyles.secondaryButton} type="button" onClick={() => {
            setIsEditing(true);
            setSuccessMessage(null);
          }}>
            Modifier
          </button>
        )}
      </header>

      <form className={`${formStyles.form} ${!isEditing ? styles.readOnlyForm : ""}`} noValidate onSubmit={handleSubmit(saveClient)}>
        <fieldset className={formStyles.section}>
          <h2>Identité</h2>
          <div className={formStyles.grid}>
            <label><span>Prénom <span className={formStyles.required}>*</span></span><input type="text" autoComplete="given-name" readOnly={!isEditing} {...register("firstName", formConfig.rules.firstName)} /><FieldError message={errors.firstName?.message} /></label>
            <label><span>Nom <span className={formStyles.required}>*</span></span><input type="text" autoComplete="family-name" readOnly={!isEditing} {...register("lastName", formConfig.rules.lastName)} /><FieldError message={errors.lastName?.message} /></label>
            <label><span>Date de naissance <span className={formStyles.required}>*</span></span><input type="date" autoComplete="bday" readOnly={!isEditing} {...register("birthDate", formConfig.rules.birthDate)} /><FieldError message={errors.birthDate?.message} /></label>
          </div>
        </fieldset>

        <fieldset className={formStyles.section}>
          <h2>Mesures actuelles</h2>
          <div className={formStyles.grid}>
            <label><span>Taille (cm) <span className={formStyles.required}>*</span></span><input type="number" min="1" step="1" readOnly={!isEditing} {...register("height", formConfig.rules.height)} /><FieldError message={errors.height?.message} /></label>
            <label><span>Poids (kg) <span className={formStyles.required}>*</span></span><input type="number" min="1" step="0.1" readOnly={!isEditing} {...register("weight", formConfig.rules.weight)} /><FieldError message={errors.weight?.message} /></label>
            <label><span>Masse grasse (%) <span className={formStyles.optional}>(optionnel)</span></span><input type="number" min="0" max="100" step="0.1" readOnly={!isEditing} {...register("bodyFat", formConfig.rules.bodyFat)} /><FieldError message={errors.bodyFat?.message} /></label>
            <label><span>Masse musculaire (kg) <span className={formStyles.optional}>(optionnel)</span></span><input type="number" min="0" step="0.1" readOnly={!isEditing} {...register("muscleMass", formConfig.rules.muscleMass)} /><FieldError message={errors.muscleMass?.message} /></label>
          </div>
        </fieldset>

        <fieldset className={formStyles.section}>
          <h2>Accompagnement</h2>
          <label><span>Objectifs <span className={formStyles.optional}>(optionnel)</span></span><textarea rows="4" readOnly={!isEditing} {...register("objectives")} /></label>

          <div className={styles.pathologies}>
            <div className={styles.sectionHeading}>
              <h3>Pathologies déclarées</h3>
              {isEditing && (
                <button className={formStyles.secondaryButton} type="button" disabled={!canAddPathology} onClick={() => append({ value: "" })}>+ Ajouter</button>
              )}
            </div>

            {fields.map((field, index) => (
              <div className={styles.dynamicField} key={field.id}>
                <label>
                  <span>Pathologie {index + 1} <span className={formStyles.optional}>(optionnel)</span></span>
                  <input type="text" readOnly={!isEditing} {...register(`pathologies.${index}.value`)} />
                </label>
                {isEditing && fields.length > 1 && (
                  <button className={`${formStyles.secondaryButton} ${styles.removeButton}`} type="button" onClick={() => remove(index)}>Supprimer</button>
                )}
              </div>
            ))}
          </div>

          <label><span>Blessures ou limitations <span className={formStyles.optional}>(optionnel)</span></span><textarea rows="3" readOnly={!isEditing} {...register("limitations")} /></label>
          <label className={formStyles.checkbox}><input type="checkbox" disabled={!isEditing} {...register("hasEatingDisorder")} />Trouble alimentaire signalé <span className={formStyles.optional}>(optionnel)</span></label>
        </fieldset>

        <fieldset className={formStyles.section}>
          <h2>Contact d'urgence</h2>
          <div className={formStyles.grid}>
            <label><span>Nom complet <span className={formStyles.optional}>(optionnel)</span></span><input type="text" readOnly={!isEditing} {...register("emergencyContactName")} /></label>
            <label><span>Lien avec le client <span className={formStyles.optional}>(optionnel)</span></span><input type="text" readOnly={!isEditing} {...register("emergencyContactRelationship")} /></label>
            <label><span>Téléphone <span className={formStyles.optional}>(optionnel)</span></span><input type="tel" autoComplete="tel" readOnly={!isEditing} {...register("emergencyContactPhone")} /></label>
          </div>
        </fieldset>

        <section className={`${formStyles.section} ${styles.history}`}>
          <h2>Historique des mesures</h2>
          <ul>
            {client.measurements.map((measurement) => (
              <li key={measurement.measuredAt}>
                <strong>{utils.formatMeasurementDate(measurement.measuredAt)}</strong>
                <span>{measurement.weight} kg</span>
                <span>{measurement.height} cm</span>
                <span>{measurement.bodyFat === undefined ? "Masse grasse non renseignée" : `${measurement.bodyFat} % de masse grasse`}</span>
                <span>{measurement.muscleMass === undefined ? "Masse musculaire non renseignée" : `${measurement.muscleMass} kg de masse musculaire`}</span>
              </li>
            ))}
          </ul>
        </section>

        {isEditing && (
          <div className={formStyles.actions}>
            <button className={formStyles.secondaryButton} type="button" onClick={cancelEditing}>Annuler</button>
            <button className={formStyles.submitButton} type="submit">Enregistrer</button>
          </div>
        )}

        {successMessage && <p className={`${formStyles.feedback} ${formStyles.successFeedback}`} role="status">{successMessage}</p>}
      </form>
    </main>
  );
}
