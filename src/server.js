'use strict';
const http = require('http');
const { EventStore } = require('./events');
const { spookyForecast } = require('./weather');
const { daysUntilHalloween } = require('./time');
const config = require('./config');

function send(res, status, body) {
  const text = JSON.stringify(body);
  res.writeHead(status, { 'content-type': 'application/json', 'content-length': Buffer.byteLength(text) });
  res.end(text);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let raw = '';
    req.on('data', (c) => { raw += c; if (raw.length > 1e5) reject(new Error('body too large')); });
    req.on('end', () => { try { resolve(raw ? JSON.parse(raw) : {}); } catch (e) { reject(e); } });
  });
}

function createServer({ store = new EventStore(), weatherBase = config.weatherBase, now = () => new Date().toISOString() } = {}) {
  return http.createServer(async (req, res) => {
    const url = new URL(req.url, 'http://localhost');
    try {
      if (req.method === 'GET' && url.pathname === '/health') return send(res, 200, { ok: true });
      if (req.method === 'GET' && url.pathname === '/countdown') {
        return send(res, 200, { daysUntilHalloween: daysUntilHalloween(now()) });
      }
      if (req.method === 'POST' && url.pathname === '/events') {
        return send(res, 201, store.create(await readBody(req)));
      }
      if (req.method === 'GET' && url.pathname === '/events') return send(res, 200, store.list());
      const m = url.pathname.match(/^\/events\/([^/]+)(\/weather)?$/);
      if (req.method === 'GET' && m) {
        const e = store.get(m[1]);
        if (!e) return send(res, 404, { error: 'not found' });
        if (m[2]) return send(res, 200, await spookyForecast(weatherBase, e.city || 'Salem'));
        return send(res, 200, store.describe(m[1], now()));
      }
      send(res, 404, { error: 'not found' });
    } catch (err) {
      send(res, err.message.startsWith('HTTP') || err.code ? 502 : 400, { error: err.message });
    }
  });
}

if (require.main === module) {
  createServer().listen(config.port, () => console.log(`Lantern listening on :${config.port}`));
}

module.exports = { createServer };
