'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const { newEventId, slugId } = require('../src/ids');

const V4 = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
const V5 = /^[0-9a-f]{8}-[0-9a-f]{4}-5[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;

test('newEventId yields unique v4 uuids', () => {
  const a = newEventId(); const b = newEventId();
  assert.match(a, V4);
  assert.notEqual(a, b);
});

test('slugId is deterministic v5 with pinned output', () => {
  assert.match(slugId('Crypt Party'), V5);
  assert.equal(slugId('Crypt Party'), slugId('Crypt Party'));
  assert.equal(slugId('Crypt Party'), '4c1bebc3-e184-5ee9-ad33-67df4c857140');
  assert.equal(slugId('Pumpkin Patch'), 'd75581dc-bbcb-5edd-b9cb-07c193196049');
});
