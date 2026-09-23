import { dashboardFilters } from "../../Dashboard.data.js";
import styles from "./DashboardControls.module.css";

const dayFormatter = new Intl.DateTimeFormat("fr-FR", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

const shortDateFormatter = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "short",
});

function formatPeriod(view, selectedDate, weekStart) {
  if (view === "day") {
    return dayFormatter.format(selectedDate);
  }

  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekEnd.getDate() + 6);
  return `${shortDateFormatter.format(weekStart)} – ${shortDateFormatter.format(weekEnd)}`;
}

export default function DashboardControls({
  view,
  selectedDate,
  weekStart,
  activeFilter,
  onViewChange,
  onFilterChange,
  onPrevious,
  onNext,
  onToday,
}) {
  return (
    <section className={styles.controls} aria-label="Contrôles du planning">
      <div className={styles.primaryRow}>
        <div className={styles.viewSwitch} aria-label="Mode d'affichage">
          <button
            className={view === "day" ? styles.active : ""}
            type="button"
            onClick={() => onViewChange("day")}
          >
            Jour
          </button>
          <button
            className={view === "week" ? styles.active : ""}
            type="button"
            onClick={() => onViewChange("week")}
          >
            Semaine
          </button>
        </div>

        <div className={styles.dateNavigation}>
          <button type="button" aria-label="Période précédente" onClick={onPrevious}>
            ‹
          </button>
          <p>{formatPeriod(view, selectedDate, weekStart)}</p>
          <button type="button" aria-label="Période suivante" onClick={onNext}>
            ›
          </button>
        </div>

        <button className={styles.todayButton} type="button" onClick={onToday}>
          Aujourd’hui
        </button>
      </div>

      <div className={styles.filters} aria-label="Filtrer les événements">
        {dashboardFilters.map((filter) => (
          <button
            className={activeFilter === filter.value ? styles.activeFilter : ""}
            type="button"
            key={filter.value}
            onClick={() => onFilterChange(filter.value)}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </section>
  );
}
