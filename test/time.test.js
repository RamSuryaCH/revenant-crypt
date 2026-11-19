'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const t = require('../src/time');

test('formatEventTime pins moment format output', () => {
  assert.equal(t.formatEventTime('2025-10-31T20:00:00Z'), 'Friday, October 31st 2025, 8:00 pm');
  assert.equal(t.formatEventTime('2025-11-02T09:05:00Z'), 'Sunday, November 2nd 2025, 9:05 am');
});

test('durationLabel pins humanized durations', () => {
  assert.equal(t.durationLabel('2025-10-31T20:00:00Z', '2025-10-31T23:00:00Z'), '3 hours');
  assert.equal(t.durationLabel('2025-10-31T20:00:00Z', '2025-10-31T20:45:00Z'), 'an hour');
  assert.equal(t.durationLabel('2025-10-31T20:00:00Z', '2025-11-02T20:00:00Z'), '2 days');
});

test('relativeTo pins relative-time strings', () => {
  const now = '2025-10-26T20:00:00Z';
  assert.equal(t.relativeTo('2025-10-31T20:00:00Z', now), 'in 5 days');
  assert.equal(t.relativeTo('2025-10-26T18:00:00Z', now), '2 hours ago');
  assert.equal(t.relativeTo('2025-10-26T20:00:20Z', now), 'in a few seconds');
});

test('daysUntilHalloween', () => {
  assert.equal(t.daysUntilHalloween('2025-10-26T20:00:00Z'), 5);
  assert.equal(t.daysUntilHalloween('2025-10-31T01:00:00Z'), 0);
  assert.equal(t.daysUntilHalloween('2025-11-05T01:00:00Z'), 0);
});
