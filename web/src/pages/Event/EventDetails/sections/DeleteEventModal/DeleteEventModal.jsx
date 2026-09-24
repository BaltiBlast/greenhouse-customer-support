import { useEffect } from "react";
import styles from "./DeleteEventModal.module.css";

export default function DeleteEventModal({
  eventName,
  errorMessage,
  isDeleting,
  onCancel,
  onConfirm,
}) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    function closeOnEscape(event) {
      if (event.key === "Escape" && !isDeleting) {
        onCancel();
      }
    }

    document.addEventListener("keydown", closeOnEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.body.style.overflow = previousOverflow;
    };
  }, [isDeleting, onCancel]);

  return (
    <div className={styles.backdrop} onMouseDown={() => !isDeleting && onCancel()}>
      <section
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-event-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div>
          <p className={styles.eyebrow}>Suppression</p>
          <h2 id="delete-event-title">Supprimer {eventName} ?</h2>
        </div>

        <p className={styles.warning}>
          Cette action est définitive. Toutes les informations associées à cet événement seront supprimées.
        </p>

        {errorMessage && <p className={styles.error} role="alert">{errorMessage}</p>}

        <div className={styles.actions}>
          <button className={styles.cancelButton} type="button" disabled={isDeleting} autoFocus onClick={onCancel}>
            Annuler
          </button>
          <button className={styles.deleteButton} type="button" disabled={isDeleting} onClick={onConfirm}>
            {isDeleting ? "Suppression..." : "Supprimer"}
          </button>
        </div>
      </section>
    </div>
  );
}
