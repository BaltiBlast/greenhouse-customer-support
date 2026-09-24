import { Link } from "react-router";
import styles from "./Schedule.module.css";
import utils from "./Schedule.utils.js";

function EventCard({ event, now }) {
  const finished = utils.isEventFinished(event, now);
  const title = event.type === "coaching" ? event.client : event.className;
  const typeLabel = event.type === "coaching" ? "Coaching" : "Cours collectif";

  return (
    <Link
      className={`${styles.eventCard} ${finished ? styles.finished : ""}`}
      to={`/events/${event.id}`}
    >
      <div className={styles.eventHeader}>
        <span className={styles.eventType}>{typeLabel}</span>
        <time dateTime={event.date.toISOString()}>
          {utils.formatTime(event.date)}
        </time>
      </div>
      <h3>{title}</h3>
      <dl className={styles.eventDetails}>
        <div>
          <dt>Date</dt>
          <dd>{utils.formatShortDate(event.date)}</dd>
        </div>
        <div>
          <dt>Durée</dt>
          <dd>{utils.formatDuration(event.duration)}</dd>
        </div>
        <div>
          <dt>Lieu</dt>
          <dd>{event.location}</dd>
        </div>
      </dl>
    </Link>
  );
}

function DayGroup({ date, events, today, now, compact = false }) {
  return (
    <section className={compact ? styles.dayColumn : styles.dayGroup}>
      <header className={styles.dayHeader}>
        <h2>
          {compact ? (
            <>
              <span className={styles.weekdayLine}>
                {utils.formatWeekday(date)} {date.getDate()}
              </span>
              <span className={styles.monthLine}>
                {utils.formatMonth(date)}
              </span>
            </>
          ) : (
            utils.formatDate(date)
          )}
        </h2>
        <span>{events.length}</span>
      </header>
      <div className={styles.dayEvents}>
        {events.length > 0 ? (
          events.map((event) => (
            <EventCard event={event} now={now} key={event.id} />
          ))
        ) : (
          <p className={styles.emptyDay}>{utils.getEmptyMessage(date, today)}</p>
        )}
      </div>
    </section>
  );
}

export default function Schedule({
  view,
  selectedDate,
  today,
  weekDays,
  events,
  isSameDay,
}) {
  const now = new Date();
  const eventsForDate = (date) =>
    events
      .filter((event) => isSameDay(event.date, date))
      .sort((first, second) => utils.compareEvents(first, second, now));

  if (view === "day") {
    return (
      <div className={styles.dailySchedule}>
        <DayGroup
          date={selectedDate}
          events={eventsForDate(selectedDate)}
          today={today}
          now={now}
        />
      </div>
    );
  }

  return (
    <div className={styles.weeklySchedule}>
      <div className={styles.weekGrid}>
        {weekDays.map((date) => (
          <DayGroup
            compact
            date={date}
            events={eventsForDate(date)}
            today={today}
            now={now}
            key={date.toISOString()}
          />
        ))}
      </div>
      <div className={styles.weekList}>
        {weekDays.map((date) => (
          <DayGroup
            date={date}
            events={eventsForDate(date)}
            today={today}
            now={now}
            key={date.toISOString()}
          />
        ))}
      </div>
    </div>
  );
}
