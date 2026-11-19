'use strict';
const dayjs = require('dayjs');
const relativeTime = require('dayjs/plugin/relativeTime');
const utc = require('dayjs/plugin/utc');
const duration = require('dayjs/plugin/duration');
const objectSupport = require('dayjs/plugin/objectSupport');
const advancedFormat = require('dayjs/plugin/advancedFormat');
dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(duration);
dayjs.extend(objectSupport);
dayjs.extend(advancedFormat);

/** "Friday, October 31st 2025, 8:00 pm" in UTC. */
function formatEventTime(iso) {
  return dayjs.utc(iso).format('dddd, MMMM Do YYYY, h:mm a');
}

/** Human duration between two instants, e.g. "3 hours". */
function durationLabel(startIso, endIso) {
  const d = dayjs.duration(dayjs.utc(endIso).diff(dayjs.utc(startIso)));
  return d.humanize();
}

/** Relative time such as "in 5 days" or "2 hours ago". `now` is injectable. */
function relativeTo(iso, now) {
  return dayjs.utc(iso).from(dayjs.utc(now));
}

/** Days remaining until Halloween (Oct 31) of the same year as `now`, never negative. */
function daysUntilHalloween(now) {
  const n = dayjs.utc(now).startOf('day');
  const h = dayjs.utc({ year: n.year(), month: 9, day: 31 });
  return Math.max(0, h.diff(n, 'days'));
}

module.exports = { formatEventTime, durationLabel, relativeTo, daysUntilHalloween };
