import { useEffect, useMemo, useState } from "react";
import { getClients } from "../../services/clients/clients.api.js";
import { getEvents } from "../../services/events/events.api.js";
import styles from "./Dashboard.module.css";
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

function createEventDate(date, startTime) {
  const eventDate = new Date(`${date.slice(0, 10)}T00:00:00`);
  const [hours, minutes] = startTime.split(":").map(Number);
  eventDate.setHours(hours, minutes, 0, 0);
  return eventDate;
}

function prepareEvents(eventList, clientList) {
  const clientsById = new Map(
    clientList.map((client) => [client.id, `${client.firstName} ${client.lastName}`]),
  );

  return eventList.map((event) => ({
    ...event,
    date: createEventDate(event.date, event.startTime),
    client: event.clientId ? clientsById.get(event.clientId) || "Client introuvable" : undefined,
  }));
}

export default function DashboardPage() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [view, setView] = useState("day");
  const [selectedDate, setSelectedDate] = useState(() => startOfDay(new Date()));
  const [activeFilter, setActiveFilter] = useState("all");
  const today = useMemo(() => startOfDay(new Date()), []);
  const weekStart = startOfWeek(selectedDate);
  const weekDays = Array.from({ length: 7 }, (_, index) =>
    addDays(weekStart, index),
  );
  const filteredEvents = events.filter(
    (event) => activeFilter === "all" || event.type === activeFilter,
  );

  useEffect(() => {
    const controller = new AbortController();

    async function loadDashboardData() {
      try {
        const [eventList, clientList] = await Promise.all([
          getEvents(controller.signal),
          getClients(controller.signal),
        ]);
        setEvents(prepareEvents(eventList, clientList));
      } catch (error) {
        if (error.name !== "AbortError") {
          setErrorMessage(error.message || "Impossible de récupérer les événements.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    loadDashboardData();

    return () => controller.abort();
  }, []);

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

      {isLoading && <p className={styles.state} role="status">Chargement des événements...</p>}
      {!isLoading && errorMessage && <p className={styles.error} role="alert">{errorMessage}</p>}
      {!isLoading && !errorMessage && (
        <Schedule
          view={view}
          selectedDate={selectedDate}
          today={today}
          weekDays={weekDays}
          events={filteredEvents}
          isSameDay={isSameDay}
        />
      )}
    </main>
  );
}
