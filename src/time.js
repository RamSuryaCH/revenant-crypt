'use strict';
const moment = require('moment');

/** "Friday, October 31st 2025, 8:00 pm" in UTC. */
function formatEventTime(iso) {
  return moment.utc(iso).format('dddd, MMMM Do YYYY, h:mm a');
}

/** Human duration between two instants, e.g. "3 hours". */
function durationLabel(startIso, endIso) {
  const d = moment.duration(moment.utc(endIso).diff(moment.utc(startIso)));
  return d.humanize();
}

/** Relative time such as "in 5 days" or "2 hours ago". `now` is injectable. */
function relativeTo(iso, now) {
  return moment.utc(iso).from(moment.utc(now));
}

/** Days remaining until Halloween (Oct 31) of the same year as `now`, never negative. */
function daysUntilHalloween(now) {
  const n = moment.utc(now).startOf('day');
  const h = moment.utc({ year: n.year(), month: 9, day: 31 });
  return Math.max(0, h.diff(n, 'days'));
}

module.exports = { formatEventTime, durationLabel, relativeTo, daysUntilHalloween };
