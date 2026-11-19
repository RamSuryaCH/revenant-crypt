'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const { getJson, postJson } = require('../src/http-client');
const { spookyForecast } = require('../src/weather');
const { startWeatherServer } = require('./helpers');

test('getJson parses JSON and sends user-agent', async () => {
  const s = await startWeatherServer();
  try {
    assert.deepEqual(await getJson(`${s.base}/forecast?city=Salem`), { tempC: 8, fog: true });
    assert.equal(s.seen[0].ua, 'lantern/1.0');
  } finally { await s.close(); }
});

test('postJson sends a JSON body and parses the reply', async () => {
  const s = await startWeatherServer();
  try {
    assert.deepEqual(await postJson(`${s.base}/echo`, { boo: 1 }), { got: { boo: 1 } });
    assert.equal(s.seen[0].method, 'POST');
    assert.match(s.seen[0].ct, /application\/json/);
  } finally { await s.close(); }
});

test('non-2xx rejects with status', async () => {
  const s = await startWeatherServer();
  try {
    await assert.rejects(getJson(`${s.base}/nope`), { message: `HTTP 500 from ${s.base}/nope` });
  } finally { await s.close(); }
});

test('connection failure rejects', async () => {
  await assert.rejects(getJson('http://127.0.0.1:1/x'), (e) => e.code === 'ECONNREFUSED');
});

test('spookyForecast verdicts', async () => {
  const s = await startWeatherServer();
  try {
    assert.deepEqual(await spookyForecast(s.base, 'Salem'), { city: 'Salem', tempC: 8, fog: true, verdict: 'delightfully spooky' });
    assert.deepEqual(await spookyForecast(s.base, 'Miami'), { city: 'Miami', tempC: 24, fog: false, verdict: 'suspiciously pleasant' });
  } finally { await s.close(); }
});
