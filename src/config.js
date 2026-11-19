'use strict';
module.exports = {
  port: Number(process.env.PORT) || 3000,
  weatherBase: process.env.LANTERN_WEATHER_URL || 'http://127.0.0.1:4010',
};
