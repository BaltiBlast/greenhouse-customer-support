import { useEffect } from "react";
import styles from "./DeleteClientModal.module.css";

export default function DeleteClientModal({
  clientName,
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
        aria-labelledby="delete-client-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div>
          <p className={styles.eyebrow}>Suppression</p>
          <h2 id="delete-client-title">Supprimer {clientName} ?</h2>
        </div>

        <p className={styles.warning}>
          Cette action est définitive. Toutes les informations associées à ce client seront supprimées.
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
