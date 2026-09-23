import { useMemo, useState } from "react";
import styles from "./Dashboard.module.css";
import { dashboardEvents } from "./Dashboard.data.js";
import DashboardControls from "./sections/DashboardControls/DashboardControls.jsx";
import Schedule from "./sections/Schedule/Schedule.jsx";

function startOfDay(date) {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
}

function addDays(date, amount) {
  const result = new Date(date);
  result.setDate(result.getDate() + amount);
  return result;
}

function startOfWeek(date) {
  const result = startOfDay(date);
  const day = result.getDay() || 7;
  return addDays(result, 1 - day);
}

function isSameDay(firstDate, secondDate) {
  return startOfDay(firstDate).getTime() === startOfDay(secondDate).getTime();
}

function createEventDate(referenceDate, dayOffset, startTime) {
  const date = addDays(startOfDay(referenceDate), dayOffset);
  const [hours, minutes] = startTime.split(":").map(Number);
  date.setHours(hours, minutes, 0, 0);
  return date;
}

function createEvents(referenceDate) {
  return dashboardEvents.map((event) => ({
    ...event,
    date: createEventDate(referenceDate, event.dayOffset, event.startTime),
  }));
}

export default function DashboardPage() {
  const [view, setView] = useState("day");
  const [selectedDate, setSelectedDate] = useState(() => startOfDay(new Date()));
  const [activeFilter, setActiveFilter] = useState("all");
  const today = useMemo(() => startOfDay(new Date()), []);
  const events = useMemo(() => createEvents(today), [today]);
  const weekStart = startOfWeek(selectedDate);
  const weekDays = Array.from({ length: 7 }, (_, index) =>
    addDays(weekStart, index),
  );
  const filteredEvents = events.filter(
    (event) => activeFilter === "all" || event.type === activeFilter,
  );

  function changePeriod(direction) {
    setSelectedDate((currentDate) =>
      addDays(currentDate, direction * (view === "day" ? 1 : 7)),
    );
  }

  function showToday() {
    setSelectedDate(startOfDay(new Date()));
  }

  return (
    <main className={styles.dashboard}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Planning</p>
        <h1>Tableau de bord</h1>
      </header>

      <DashboardControls
        view={view}
        selectedDate={selectedDate}
        weekStart={weekStart}
        activeFilter={activeFilter}
        onViewChange={setView}
        onFilterChange={setActiveFilter}
        onPrevious={() => changePeriod(-1)}
        onNext={() => changePeriod(1)}
        onToday={showToday}
      />

      <Schedule
        view={view}
        selectedDate={selectedDate}
        today={today}
        weekDays={weekDays}
        events={filteredEvents}
        isSameDay={isSameDay}
      />
    </main>
  );
}
