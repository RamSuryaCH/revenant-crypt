'use strict';
const request = require('request');

/** GET a URL and resolve with parsed JSON. Rejects on network error or non-2xx. */
function getJson(url, { timeoutMs = 3000 } = {}) {
  return new Promise((resolve, reject) => {
    request({ url, json: true, timeout: timeoutMs, headers: { 'user-agent': 'lantern/1.0' } }, (err, res, body) => {
      if (err) return reject(err);
      if (res.statusCode < 200 || res.statusCode >= 300) {
        return reject(new Error(`HTTP ${res.statusCode} from ${url}`));
      }
      resolve(body);
    });
  });
}

/** POST JSON and resolve with parsed JSON response. */
function postJson(url, payload, { timeoutMs = 3000 } = {}) {
  return new Promise((resolve, reject) => {
    request.post({ url, json: payload, timeout: timeoutMs }, (err, res, body) => {
      if (err) return reject(err);
      if (res.statusCode < 200 || res.statusCode >= 300) {
        return reject(new Error(`HTTP ${res.statusCode} from ${url}`));
      }
      resolve(body);
    });
  });
}

module.exports = { getJson, postJson };
