# Tasks: Replace uuid@3 v4() with crypto.randomUUID()

- [ ] 1. Apply the patch (`git apply migrate-uuid-to-randomuuid.patch`)
  - [ ] 1.1 Review every `TODO(revenant)` comment
  - [ ] 1.2 Install the replacement
  - _Requirements: R1.1, R1.2, R2.2_
- [ ] 2. Run the differential property-based tests (`tests/revenant/uuid3-to-randomuuid.differential.test.ts`)
  - [ ] 2.1 Install test deps: `vitest fast-check uuid@3`
  - [ ] 2.2 Confirm at least 100 runs per property pass
  - _Requirements: R2.1_
- [ ] 3. Run the project's own test suite and fix any regression
  - _Requirements: R3.1_
- [ ] 4. Resolve migration notes
  - [ ] "uuid" is still imported somewhere (unmigrated usage), so it stays in package.json.
  - _Requirements: R2.2_
