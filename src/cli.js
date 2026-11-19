#!/usr/bin/env node
'use strict';
const { formatEventTime, relativeTo, daysUntilHalloween } = require('./time');
const { slugId } = require('./ids');
const { spookyForecast } = require('./weather');
const config = require('./config');

async function main(argv, out = console.log) {
  const [cmd, ...args] = argv;
  const now = new Date().toISOString();
  switch (cmd) {
    case 'countdown':
      out(`${daysUntilHalloween(now)} days until Halloween`);
      return 0;
    case 'when':
      out(`${formatEventTime(args[0])} (${relativeTo(args[0], now)})`);
      return 0;
    case 'id':
      out(slugId(args.join(' ')));
      return 0;
    case 'weather': {
      const f = await spookyForecast(config.weatherBase, args[0] || 'Salem');
      out(`${f.city}: ${f.tempC}C, ${f.verdict}`);
      return 0;
    }
    default:
      out('usage: lantern <countdown|when <iso>|id <name>|weather [city]>');
      return cmd ? 1 : 0;
  }
}

if (require.main === module) {
  main(process.argv.slice(2)).then((c) => process.exit(c), (e) => { console.error(e.message); process.exit(1); });
}

module.exports = { main };
