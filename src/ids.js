'use strict';
// uuid@3 deep-import API (removed in later majors).
const { randomUUID } = require('node:crypto');
const uuidv5 = require('uuid/v5');

const LANTERN_NAMESPACE = '6f1c2f3a-7b1e-4c55-9a52-0d3f5a1e2b77';

/** Random id for a new event. */
function newEventId() {
  return randomUUID();
}

/** Deterministic id derived from a name (stable across runs). */
function slugId(name) {
  return uuidv5(String(name), LANTERN_NAMESPACE);
}

module.exports = { newEventId, slugId, LANTERN_NAMESPACE };
