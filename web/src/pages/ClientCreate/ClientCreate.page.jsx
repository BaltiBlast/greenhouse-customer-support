import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { createClient } from "../../services/clients/clients.api.js";
import formStyles from "../../styles/Form.module.css";
import formConfig from "./ClientCreate.form.js";
import styles from "./ClientCreate.module.css";

function FieldError({ message }) {
  return message ? <span className={formStyles.fieldError}>{message}</span> : null;
}

export default function ClientCreatePage() {
  const [successMessage, setSuccessMessage] = useState(null);
  const {
    clearErrors,
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    reset,
    setError,
    watch,
  } = useForm({ defaultValues: formConfig.defaultValues });
  const { append, fields, remove } = useFieldArray({
    control,
    name: "pathologies",
  });
  const pathologies = watch("pathologies");
  const canAddPathology = Boolean(pathologies?.at(-1)?.value?.trim());

  async function submitClient(data) {
    clearErrors("root.server");
    setSuccessMessage(null);

    const clientData = {
      ...data,
      pathologies: data.pathologies.map(({ value }) => value),
    };

    try {
      await createClient(clientData);
      reset();
      setSuccessMessage("Le client a bien été créé.");
    } catch (error) {
      setError("root.server", {
        type: "server",
        message: error.message || "Impossible d'envoyer les données du client.",
      });
    }
  }

  return (
    <main className={formStyles.page}>
      <header className={formStyles.header}>
        <p className={formStyles.eyebrow}>Clients</p>
        <h1>Ajouter un client</h1>
      </header>

      <form className={formStyles.form} noValidate onSubmit={handleSubmit(submitClient)}>
        <fieldset className={formStyles.section}>
          <h2>Identité</h2>
          <div className={formStyles.grid}>
            <label><span>Prénom <span className={formStyles.required}>*</span></span><input type="text" autoComplete="given-name" {...register("firstName", formConfig.rules.firstName)} /><FieldError message={errors.firstName?.message} /></label>
            <label><span>Nom <span className={formStyles.required}>*</span></span><input type="text" autoComplete="family-name" {...register("lastName", formConfig.rules.lastName)} /><FieldError message={errors.lastName?.message} /></label>
            <label><span>Date de naissance <span className={formStyles.required}>*</span></span><input type="date" autoComplete="bday" {...register("birthDate", formConfig.rules.birthDate)} /><FieldError message={errors.birthDate?.message} /></label>
          </div>
        </fieldset>

        <fieldset className={formStyles.section}>
          <h2>Mesures</h2>
          <div className={formStyles.grid}>
            <label><span>Taille (cm) <span className={formStyles.required}>*</span></span><input type="number" min="1" step="1" inputMode="numeric" {...register("height", formConfig.rules.height)} /><FieldError message={errors.height?.message} /></label>
            <label><span>Poids (kg) <span className={formStyles.required}>*</span></span><input type="number" min="1" step="0.1" inputMode="decimal" {...register("weight", formConfig.rules.weight)} /><FieldError message={errors.weight?.message} /></label>
            <label><span>Masse grasse (%) <span className={formStyles.optional}>(optionnel)</span></span><input type="number" min="0" max="100" step="0.1" inputMode="decimal" {...register("bodyFat", formConfig.rules.bodyFat)} /><FieldError message={errors.bodyFat?.message} /></label>
            <label><span>Masse musculaire (kg) <span className={formStyles.optional}>(optionnel)</span></span><input type="number" min="0" step="0.1" inputMode="decimal" {...register("muscleMass", formConfig.rules.muscleMass)} /><FieldError message={errors.muscleMass?.message} /></label>
          </div>
        </fieldset>

        <fieldset className={formStyles.section}>
          <h2>Accompagnement</h2>
          <label><span>Objectifs <span className={formStyles.optional}>(optionnel)</span></span><textarea rows="4" {...register("objectives")} /></label>

          <div className={styles.pathologies}>
            <div className={styles.sectionHeading}>
              <h3>Pathologies déclarées</h3>
              <button className={formStyles.secondaryButton} type="button" disabled={!canAddPathology} onClick={() => append({ value: "" })}>
                + Ajouter
              </button>
            </div>

            {fields.map((field, index) => (
              <div className={styles.dynamicField} key={field.id}>
                <label>
                  <span>Pathologie {index + 1} <span className={formStyles.optional}>(optionnel)</span></span>
                  <input type="text" {...register(`pathologies.${index}.value`)} />
                  <FieldError message={errors.pathologies?.[index]?.value?.message} />
                </label>
                {fields.length > 1 && (
                  <button className={`${formStyles.secondaryButton} ${styles.removeButton}`} type="button" aria-label={`Supprimer la pathologie ${index + 1}`} onClick={() => remove(index)}>Supprimer</button>
                )}
              </div>
            ))}
          </div>

          <label><span>Blessures ou limitations <span className={formStyles.optional}>(optionnel)</span></span><textarea rows="3" {...register("limitations")} /></label>
          <label className={formStyles.checkbox}><input type="checkbox" {...register("hasEatingDisorder")} />Trouble alimentaire signalé <span className={formStyles.optional}>(optionnel)</span></label>
        </fieldset>

        <fieldset className={formStyles.section}>
          <h2>Contact d'urgence</h2>
          <div className={formStyles.grid}>
            <label><span>Nom complet <span className={formStyles.optional}>(optionnel)</span></span><input type="text" {...register("emergencyContactName")} /></label>
            <label><span>Lien avec le client <span className={formStyles.optional}>(optionnel)</span></span><input type="text" {...register("emergencyContactRelationship")} /></label>
            <label><span>Téléphone <span className={formStyles.optional}>(optionnel)</span></span><input type="tel" autoComplete="tel" {...register("emergencyContactPhone")} /></label>
          </div>
        </fieldset>

        <div className={formStyles.actions}>
          <button className={formStyles.submitButton} type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Envoi en cours..." : "Enregistrer le client"}
          </button>
        </div>

        {errors.root?.server?.message && (
          <p className={`${formStyles.feedback} ${formStyles.errorFeedback}`} role="alert">
            {errors.root.server.message}
          </p>
        )}

        {successMessage && (
          <p className={`${formStyles.feedback} ${formStyles.successFeedback}`} role="status">
            {successMessage}
          </p>
        )}
      </form>
    </main>
  );
}
