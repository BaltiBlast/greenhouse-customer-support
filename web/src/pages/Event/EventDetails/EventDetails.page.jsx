import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router";
import { getClients } from "../../../services/clients/clients.api.js";
import { deleteEvent, getEventById, updateEvent } from "../../../services/events/events.api.js";
import formStyles from "../../../styles/Form.module.css";
import { eventTypes } from "../EventCreate/EventCreate.data.js";
import formConfig from "./EventDetails.form.js";
import styles from "./EventDetails.module.css";
import DeleteEventModal from "./sections/DeleteEventModal/DeleteEventModal.jsx";

function FieldError({ message }) {
  return message ? <span className={formStyles.fieldError}>{message}</span> : null;
}

function getFormValues(event) {
  return {
    type: event.type,
    date: event.date.slice(0, 10),
    startTime: event.startTime,
    duration: event.duration,
    location: event.location,
    description: event.description,
    clientId: event.clientId || "",
    className: event.className || "",
  };
}

export default function EventDetailsPage() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [clients, setClients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);
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

    async function loadEvent() {
      try {
        const [eventData, clientList] = await Promise.all([
          getEventById(eventId, controller.signal),
          getClients(controller.signal),
        ]);

        setEvent(eventData);
        setClients(clientList);
        reset(getFormValues(eventData));
      } catch (error) {
        if (error.name !== "AbortError") {
          setErrorMessage(
            error.status === 404
              ? "Cet événement est introuvable."
              : error.message || "Impossible de récupérer l'événement.",
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    loadEvent();

    return () => controller.abort();
  }, [eventId, reset]);

  if (isLoading) {
    return <main className={styles.state}><p role="status">Chargement de l'événement...</p></main>;
  }

  if (errorMessage || !event) {
    return (
      <main className={styles.state}>
        <p role="alert">{errorMessage || "Cet événement est introuvable."}</p>
        <Link to="/events">Revenir aux événements</Link>
      </main>
    );
  }

  const client = clients.find((item) => item.id === event.clientId);
  const title = event.type === "coaching"
    ? client ? `${client.firstName} ${client.lastName}` : "Client introuvable"
    : event.className;

  function cancelEditing() {
    reset(getFormValues(event));
    clearErrors("root.server");
    setIsEditing(false);
    setSuccessMessage(null);
  }

  async function saveEvent(data) {
    clearErrors("root.server");
    setSuccessMessage(null);

    const eventData = {
      ...data,
      location: data.location.trim(),
      description: data.description.trim(),
      ...(data.className ? { className: data.className.trim() } : {}),
    };

    try {
      await updateEvent(eventId, eventData);
      const updatedEvent = {
        ...event,
        ...eventData,
        clientId: eventData.type === "coaching" ? eventData.clientId : undefined,
        className: eventData.type === "group-class" ? eventData.className : undefined,
      };

      setEvent(updatedEvent);
      reset(getFormValues(updatedEvent));
      setIsEditing(false);
      setSuccessMessage("Les modifications ont été enregistrées.");
    } catch (error) {
      setError("root.server", {
        type: "server",
        message: error.message || "Impossible de modifier l'événement.",
      });
    }
  }

  async function confirmDeleteEvent() {
    setIsDeleting(true);
    setDeleteError(null);

    try {
      await deleteEvent(eventId);
      navigate("/events", { replace: true });
    } catch (error) {
      setDeleteError(error.message || "Impossible de supprimer l'événement.");
      setIsDeleting(false);
    }
  }

  return (
    <main className={formStyles.page}>
      <Link className={styles.backLink} to="/events">Retour aux événements</Link>

      <header className={`${formStyles.header} ${styles.header}`}>
        <div>
          <p className={formStyles.eyebrow}>Fiche événement</p>
          <h1>{title}</h1>
        </div>

        {!isEditing && (
          <div className={styles.headerActions}>
            <button className={`${formStyles.secondaryButton} ${styles.deleteButton}`} type="button" onClick={() => {
              setDeleteError(null);
              setIsDeleteModalOpen(true);
            }}>
              Supprimer
            </button>
            <button className={formStyles.secondaryButton} type="button" onClick={() => {
              setIsEditing(true);
              setSuccessMessage(null);
            }}>
              Modifier
            </button>
          </div>
        )}
      </header>

      <form className={`${formStyles.form} ${!isEditing ? styles.readOnlyForm : ""}`} noValidate onSubmit={handleSubmit(saveEvent)}>
        <fieldset className={formStyles.section}>
          <h2>Informations générales</h2>
          <div className={formStyles.grid}>
            <label>
              <span>Type d'événement <span className={formStyles.required}>*</span></span>
              <select disabled={!isEditing} {...register("type", formConfig.rules.type)}>
                {eventTypes.map((type) => <option value={type.value} key={type.value}>{type.label}</option>)}
              </select>
              <FieldError message={errors.type?.message} />
            </label>
            <label>
              <span>Date <span className={formStyles.required}>*</span></span>
              <input type="date" readOnly={!isEditing} {...register("date", formConfig.rules.date)} />
              <FieldError message={errors.date?.message} />
            </label>
            <label>
              <span>Heure de début <span className={formStyles.required}>*</span></span>
              <input type="time" readOnly={!isEditing} {...register("startTime", formConfig.rules.startTime)} />
              <FieldError message={errors.startTime?.message} />
            </label>
            <label>
              <span>Durée (minutes) <span className={formStyles.required}>*</span></span>
              <input type="number" min="1" step="1" readOnly={!isEditing} {...register("duration", formConfig.rules.duration)} />
              <FieldError message={errors.duration?.message} />
            </label>
            <label>
              <span>Lieu <span className={formStyles.required}>*</span></span>
              <input type="text" readOnly={!isEditing} {...register("location", formConfig.rules.location)} />
              <FieldError message={errors.location?.message} />
            </label>
          </div>
          <label>
            <span>Description <span className={formStyles.required}>*</span></span>
            <textarea rows="5" readOnly={!isEditing} {...register("description", formConfig.rules.description)} />
            <FieldError message={errors.description?.message} />
          </label>
        </fieldset>

        {eventType === "coaching" && (
          <fieldset className={formStyles.section}>
            <h2>Coaching individuel</h2>
            <div className={formStyles.grid}>
              <label>
                <span>Client <span className={formStyles.required}>*</span></span>
                <select disabled={!isEditing} {...register("clientId", formConfig.rules.clientId)}>
                  <option value="">Sélectionner un client</option>
                  {clients.map((item) => (
                    <option value={item.id} key={item.id}>{item.firstName} {item.lastName}</option>
                  ))}
                </select>
                <FieldError message={errors.clientId?.message} />
                {!isEditing && client && <Link className={styles.clientLink} to={`/clients/${client.id}`}>Voir la fiche du client</Link>}
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
                <input type="text" readOnly={!isEditing} {...register("className", formConfig.rules.className)} />
                <FieldError message={errors.className?.message} />
              </label>
            </div>
          </fieldset>
        )}

        {isEditing && (
          <div className={formStyles.actions}>
            <button className={formStyles.secondaryButton} type="button" onClick={cancelEditing}>Annuler</button>
            <button className={formStyles.submitButton} type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Enregistrement..." : "Enregistrer"}
            </button>
          </div>
        )}

        {errors.root?.server?.message && (
          <p className={`${formStyles.feedback} ${formStyles.errorFeedback}`} role="alert">{errors.root.server.message}</p>
        )}
        {successMessage && (
          <p className={`${formStyles.feedback} ${formStyles.successFeedback}`} role="status">{successMessage}</p>
        )}
      </form>

      {isDeleteModalOpen && (
        <DeleteEventModal
          eventName={title}
          errorMessage={deleteError}
          isDeleting={isDeleting}
          onCancel={() => setIsDeleteModalOpen(false)}
          onConfirm={confirmDeleteEvent}
        />
      )}
    </main>
  );
}
