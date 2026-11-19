'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const { main } = require('../src/cli');

test('cli id is deterministic', async () => {
  const out = [];
  assert.equal(await main(['id', 'Crypt', 'Party'], (s) => out.push(s)), 0);
  assert.equal(out[0], '4c1bebc3-e184-5ee9-ad33-67df4c857140');
});

test('cli when formats the date', async () => {
  const out = [];
  await main(['when', '2020-10-31T20:00:00Z'], (s) => out.push(s));
  assert.match(out[0], /^Saturday, October 31st 2020, 8:00 pm \(.+ ago\)$/);
});

test('cli usage exit code', async () => {
  assert.equal(await main(['bogus'], () => {}), 1);
});
