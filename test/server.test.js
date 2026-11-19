'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const { createServer } = require('../src/server');
const { startWeatherServer } = require('./helpers');

async function withApp(fn) {
  const weather = await startWeatherServer();
  const app = createServer({ weatherBase: weather.base, now: () => '2025-10-26T20:00:00Z' });
  await new Promise((r) => app.listen(0, '127.0.0.1', r));
  const base = `http://127.0.0.1:${app.address().port}`;
  try { await fn(base); } finally { app.close(); await weather.close(); }
}
const j = async (url, opts) => { const r = await fetch(url, opts); return [r.status, await r.json()]; };

test('event lifecycle with pinned human-readable output', async () => {
  await withApp(async (base) => {
    const [st, created] = await j(`${base}/events`, {
      method: 'POST',
      body: JSON.stringify({ title: 'Crypt Party', start: '2025-10-31T20:00:00Z', end: '2025-10-31T23:00:00Z', city: 'Salem' }),
    });
    assert.equal(st, 201);
    assert.match(created.id, /^[0-9a-f-]{36}$/);
    const [, d] = await j(`${base}/events/${created.id}`);
    assert.equal(d.when, 'Friday, October 31st 2025, 8:00 pm');
    assert.equal(d.lasts, '3 hours');
    assert.equal(d.relative, 'in 5 days');
    const [, w] = await j(`${base}/events/${created.id}/weather`);
    assert.equal(w.verdict, 'delightfully spooky');
    const [, list] = await j(`${base}/events`);
    assert.equal(list.length, 1);
  });
});

test('countdown, validation and 404', async () => {
  await withApp(async (base) => {
    assert.deepEqual((await j(`${base}/countdown`))[1], { daysUntilHalloween: 5 });
    const [st] = await j(`${base}/events`, { method: 'POST', body: JSON.stringify({ title: 'x' }) });
    assert.equal(st, 400);
    assert.equal((await j(`${base}/events/missing`))[0], 404);
  });
});
