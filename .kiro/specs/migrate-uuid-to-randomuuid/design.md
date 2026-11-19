# Design: Replace uuid@3 v4() with crypto.randomUUID()

## Approach

Apply the curated `uuid3-to-randomuuid` recipe: a deterministic source transform, a `package.json` edit. Verification is differential: the old and new implementations run side by side under fast-check.

## Flow

```mermaid
flowchart LR
  A[Scan: uuid flagged] --> B[Recipe uuid3-to-randomuuid]
  B --> C[Patch: 1 files]
  B --> D[Differential PBT]
  C --> E{Tests green?}
  D --> E
  E -- yes --> F[Open PR]
  E -- no --> G[Review TODO notes]
```

## Known limits

- Only v4() is migrated. v1/v3/v5 stay on uuid and the dependency is kept when they are used.
- Calls that pass options or a buffer to v4() cannot be expressed with randomUUID(); those files are left unchanged and reported.
- Differential tests compare format, version and variant bits and uniqueness; randomness quality is delegated to the platform CSPRNG.

## Files changed

- `src/ids.js`

