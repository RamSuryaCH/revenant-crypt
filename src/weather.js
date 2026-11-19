'use strict';
const { getJson } = require('./http-client');

/** Fetch the forecast for a city from the weather service and add a spooky verdict. */
async function spookyForecast(base, city) {
  const data = await getJson(`${base}/forecast?city=${encodeURIComponent(city)}`);
  const spooky = data.fog || data.tempC <= 10;
  return { city, tempC: data.tempC, fog: Boolean(data.fog), verdict: spooky ? 'delightfully spooky' : 'suspiciously pleasant' };
}

module.exports = { spookyForecast };
