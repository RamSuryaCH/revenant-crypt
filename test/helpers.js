'use strict';
const http = require('http');

/** Local stand-in for a weather API. Records requests. */
function startWeatherServer() {
  const seen = [];
  const server = http.createServer((req, res) => {
    let raw = '';
    req.on('data', (c) => (raw += c));
    req.on('end', () => {
      seen.push({ method: req.method, url: req.url, ua: req.headers['user-agent'], ct: req.headers['content-type'], body: raw });
      const u = new URL(req.url, 'http://x');
      if (u.pathname === '/forecast') {
        const city = u.searchParams.get('city');
        const body = city === 'Salem' ? { tempC: 8, fog: true } : { tempC: 24, fog: false };
        res.writeHead(200, { 'content-type': 'application/json' });
        return res.end(JSON.stringify(body));
      }
      if (u.pathname === '/echo') {
        res.writeHead(200, { 'content-type': 'application/json' });
        return res.end(JSON.stringify({ got: raw ? JSON.parse(raw) : null }));
      }
      res.writeHead(500, { 'content-type': 'application/json' });
      res.end('{"error":"boom"}');
    });
  });
  return new Promise((resolve) => server.listen(0, '127.0.0.1', () => {
    resolve({ server, seen, base: `http://127.0.0.1:${server.address().port}`, close: () => new Promise((r) => server.close(r)) });
  }));
}

module.exports = { startWeatherServer };
