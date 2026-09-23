const utils = {
  dateFormatter: new Intl.DateTimeFormat("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }),

  shortDateFormatter: new Intl.DateTimeFormat("fr-FR", {
    weekday: "short",
    day: "numeric",
    month: "short",
  }),

  weekdayFormatter: new Intl.DateTimeFormat("fr-FR", {
    weekday: "long",
  }),

  monthFormatter: new Intl.DateTimeFormat("fr-FR", {
    month: "long",
  }),

  timeFormatter: new Intl.DateTimeFormat("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  }),

  formatDate(date) {
    return utils.dateFormatter.format(date);
  },

  formatShortDate(date) {
    return utils.shortDateFormatter.format(date);
  },

  formatWeekday(date) {
    return utils.weekdayFormatter.format(date);
  },

  formatMonth(date) {
    return utils.monthFormatter.format(date);
  },

  formatTime(date) {
    return utils.timeFormatter.format(date);
  },

  formatDuration(duration) {
    if (duration < 60) {
      return `${duration} min`;
    }

    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return minutes ? `${hours} h ${minutes}` : `${hours} h`;
  },

  getEmptyMessage(date, today) {
    const dateTime = date.getTime();
    const todayTime = today.getTime();

    if (dateTime < todayTime) {
      return "Aucun événement n’était prévu ce jour-là.";
    }

    if (dateTime > todayTime) {
      return "Aucun événement n’est encore prévu ce jour-là.";
    }

    return "Rien n’est prévu aujourd’hui.";
  },

  isEventFinished(event, now) {
    const endTime = new Date(event.date.getTime() + event.duration * 60_000);
    return endTime <= now;
  },

  compareEvents(firstEvent, secondEvent, now) {
    const firstIsFinished = utils.isEventFinished(firstEvent, now);
    const secondIsFinished = utils.isEventFinished(secondEvent, now);

    if (firstIsFinished !== secondIsFinished) {
      return firstIsFinished ? 1 : -1;
    }

    return firstEvent.date - secondEvent.date;
  },
};

export default utils;
