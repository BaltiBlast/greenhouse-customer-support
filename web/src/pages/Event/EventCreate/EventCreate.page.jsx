import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getClients } from "../../../services/clients/clients.api.js";
import { createEvent } from "../../../services/events/events.api.js";
import formStyles from "../../../styles/Form.module.css";
import { eventTypes } from "./EventCreate.data.js";
import formConfig from "./EventCreate.form.js";

function FieldError({ message }) {
  return message ? <span className={formStyles.fieldError}>{message}</span> : null;
}

export default function EventCreatePage() {
  const [clients, setClients] = useState([]);
  const [clientsError, setClientsError] = useState(null);
  const [isLoadingClients, setIsLoadingClients] = useState(true);
  const [successMessage, setSuccessMessage] = useState(null);
  const {
    clearErrors,
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    reset,
    setError,
    watch,
  } = useForm({
    defaultValues: formConfig.defaultValues,
    shouldUnregister: true,
  });
  const eventType = watch("type");

  useEffect(() => {
    const controller = new AbortController();

    async function loadClients() {
      try {
        const clientList = await getClients(controller.signal);
        setClients(clientList);
      } catch (error) {
        if (error.name !== "AbortError") {
          setClientsError(error.message || "Impossible de récupérer les clients.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoadingClients(false);
        }
      }
    }

    loadClients();

    return () => controller.abort();
  }, []);

  async function submitEvent(data) {
    clearErrors("root.server");
    setSuccessMessage(null);

    const eventData = {
      ...data,
      location: data.location.trim(),
      description: data.description.trim(),
      ...(data.className ? { className: data.className.trim() } : {}),
    };

    try {
      await createEvent(eventData);
      reset();
      setSuccessMessage("L'événement a bien été créé.");
    } catch (error) {
      setError("root.server", {
        type: "server",
        message: error.message || "Impossible d'envoyer les données de l'événement.",
      });
    }
  }

  return (
    <main className={formStyles.page}>
      <header className={formStyles.header}>
        <p className={formStyles.eyebrow}>Planning</p>
        <h1>Ajouter un événement</h1>
      </header>

      <form className={formStyles.form} noValidate onSubmit={handleSubmit(submitEvent)}>
        <fieldset className={formStyles.section}>
          <h2>Informations générales</h2>
          <div className={formStyles.grid}>
            <label>
              <span>Type d’événement <span className={formStyles.required}>*</span></span>
              <select {...register("type", formConfig.rules.type)}>
                <option value="">Sélectionner un type</option>
                {eventTypes.map((type) => (
                  <option value={type.value} key={type.value}>{type.label}</option>
                ))}
              </select>
              <FieldError message={errors.type?.message} />
            </label>

            <label>
              <span>Date <span className={formStyles.required}>*</span></span>
              <input type="date" {...register("date", formConfig.rules.date)} />
              <FieldError message={errors.date?.message} />
            </label>

            <label>
              <span>Heure de début <span className={formStyles.required}>*</span></span>
              <input type="time" {...register("startTime", formConfig.rules.startTime)} />
              <FieldError message={errors.startTime?.message} />
            </label>

            <label>
              <span>Durée (minutes) <span className={formStyles.required}>*</span></span>
              <input type="number" min="1" step="1" inputMode="numeric" {...register("duration", formConfig.rules.duration)} />
              <FieldError message={errors.duration?.message} />
            </label>

            <label>
              <span>Lieu <span className={formStyles.required}>*</span></span>
              <input type="text" {...register("location", formConfig.rules.location)} />
              <FieldError message={errors.location?.message} />
            </label>
          </div>

          <label>
            <span>Description <span className={formStyles.required}>*</span></span>
            <textarea rows="5" {...register("description", formConfig.rules.description)} />
            <FieldError message={errors.description?.message} />
          </label>
        </fieldset>

        {eventType === "coaching" && (
          <fieldset className={formStyles.section}>
            <h2>Coaching individuel</h2>
            <div className={formStyles.grid}>
              <label>
                <span>Client <span className={formStyles.required}>*</span></span>
                <select
                  disabled={isLoadingClients || Boolean(clientsError)}
                  {...register("clientId", formConfig.rules.clientId)}
                >
                  <option value="">
                    {isLoadingClients ? "Chargement des clients..." : "Sélectionner un client"}
                  </option>
                  {clients.map((client) => (
                    <option value={client.id} key={client.id}>
                      {client.firstName} {client.lastName}
                    </option>
                  ))}
                </select>
                <FieldError message={errors.clientId?.message} />
                {clientsError && <span className={formStyles.fieldError}>{clientsError}</span>}
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
                <input type="text" {...register("className", formConfig.rules.className)} />
                <FieldError message={errors.className?.message} />
              </label>
            </div>
          </fieldset>
        )}

        <div className={formStyles.actions}>
          <button className={formStyles.submitButton} type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Envoi en cours..." : "Enregistrer l'événement"}
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
