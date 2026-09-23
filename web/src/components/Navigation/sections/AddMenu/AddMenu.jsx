import { useEffect, useId, useRef, useState } from "react";
import { Link } from "react-router";
import styles from "./AddMenu.module.css";

const actions = [
  { label: "Client", to: "/clients/new" },
  { label: "Séance", to: "/sessions/new" },
  { label: "Cours collectif", to: "/group-classes/new" },
];

export default function AddMenu({ compact = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuId = useId();
  const menuRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    function closeOnOutsideClick(event) {
      if (!menuRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("pointerdown", closeOnOutsideClick);

    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
    };
  }, [isOpen]);

  return (
    <div className={styles.container} ref={menuRef}>
      <button
        className={`${styles.trigger} ${compact ? styles.compact : ""}`}
        type="button"
        aria-label="Créer un nouvel élément"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-controls={menuId}
        onClick={() => setIsOpen((current) => !current)}
      >
        {compact ? "+" : "+ Nouveau"}
      </button>

      {isOpen && (
        <ul id={menuId} className={styles.menu}>
          {actions.map((action) => (
            <li key={action.to}>
              <Link
                to={action.to}
                onClick={() => setIsOpen(false)}
              >
                {action.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
