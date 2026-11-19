'use strict';
const { newEventId } = require('./ids');
const { formatEventTime, durationLabel, relativeTo } = require('./time');

class EventStore {
  constructor() { this.events = new Map(); }

  create({ title, start, end, city }) {
    if (!title || !start || !end) throw new Error('title, start and end are required');
    if (Date.parse(end) <= Date.parse(start)) throw new Error('end must be after start');
    const event = { id: newEventId(), title, start, end, city: city || null };
    this.events.set(event.id, event);
    return event;
  }

  get(id) { return this.events.get(id) || null; }

  list() {
    return [...this.events.values()].sort((a, b) => Date.parse(a.start) - Date.parse(b.start));
  }

  /** Event enriched with human-readable time fields. */
  describe(id, now) {
    const e = this.get(id);
    if (!e) return null;
    return {
      ...e,
      when: formatEventTime(e.start),
      lasts: durationLabel(e.start, e.end),
      relative: relativeTo(e.start, now),
    };
  }
}

module.exports = { EventStore };
