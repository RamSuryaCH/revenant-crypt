# Requirements: Replace request with native fetch

## Context

- `request` is flagged by Revenant as abandoned or unsupported.

Scope: 9 source files scanned, 1 need changes.

## User stories

- As a maintainer, I want to stop depending on `request` so that I no longer ship an unmaintained dependency.
- As a reviewer, I want proof that behaviour is unchanged so that I can merge with confidence.

## Acceptance criteria (EARS)

- R1.1 WHEN the migration patch is applied THE SYSTEM SHALL contain no import or require of `request` in the 1 migrated files.
- R1.2 WHEN `package.json` is read THE SYSTEM SHALL no longer list `request` as a dependency, unless unmigrated usage remains.
- R2.1 WHEN the differential property-based tests run THE SYSTEM SHALL show identical observable behaviour between `request` and native fetch (request-compat shim) for the covered operations over at least 100 generated inputs each.
- R2.2 IF a call site uses behaviour the recipe cannot express THEN THE SYSTEM SHALL leave a `TODO(revenant)` comment and list it in the migration notes instead of silently changing it.
- R3.1 WHERE the project's own test suite exists THE SYSTEM SHALL pass it unchanged after the migration.
