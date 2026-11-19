# Tasks: Replace request with native fetch

- [ ] 1. Apply the patch (`git apply migrate-request-to-fetch.patch`)
  - [ ] 1.1 Review every `TODO(revenant)` comment
  - [ ] 1.2 Install the replacement
  - _Requirements: R1.1, R1.2, R2.2_
- [ ] 2. Run the differential property-based tests (`tests/revenant/request-to-fetch.differential.test.ts`)
  - [ ] 2.1 Install test deps: `vitest fast-check request`
  - [ ] 2.2 Confirm at least 100 runs per property pass
  - _Requirements: R2.1_
- [ ] 3. Run the project's own test suite and fix any regression
  - _Requirements: R3.1_
