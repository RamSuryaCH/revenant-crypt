# revenant-crypt (Lantern)

**This is the intentionally haunted sandbox for [Revenant](https://github.com/RamSuryaCH/revenant).**

Revenant finds dead npm dependencies and resurrects them with migration pull
requests. This repo exists so those PRs have somewhere real to land. Every PR
on this repo whose branch starts with `revenant/` is opened by Revenant. Do not
"fix" the dependencies by hand: the decay is the point.

## What it is

Lantern is a tiny Halloween event planner: a dependency-light HTTP JSON API and
a CLI (plain Node.js, CommonJS, no framework).

## The curse

| Package | Version | Status | Used in |
|---|---|---|---|
| `moment` | 2.29.4 | legacy / maintenance mode | `src/time.js` |
| `request` | 2.88.2 | deprecated | `src/http-client.js` |
| `uuid` | 3.4.0 | deprecated old major | `src/ids.js` |

`npm install` prints deprecation warnings. That is expected.

## Run

```sh
npm install
npm test            # offline; uses a local server in place of a weather API
npm start           # API on :3000
node src/cli.js countdown
```

API: `GET /health`, `GET /countdown`, `POST /events`, `GET /events`,
`GET /events/:id`, `GET /events/:id/weather`.

Tests pin exact outputs (date strings, durations, relative time, UUID v5 values,
HTTP request/response behavior), so a migration that changes behavior fails CI.

## Nightly reset

`scripts/reset.sh` closes open `revenant/` PRs and deletes their branches in
this repo only.

## License

MIT
