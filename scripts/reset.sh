#!/usr/bin/env bash
# Close open Revenant PRs and delete their revenant/* branches.
# Hard-locked to RamSuryaCH/revenant-crypt. Use DRY_RUN=1 to preview.
set -euo pipefail
REPO="RamSuryaCH/revenant-crypt"
DRY="${DRY_RUN:-0}"

run() { if [ "$DRY" = "1" ]; then echo "[dry-run] $*"; else "$@"; fi; }

# Close open PRs whose head branch starts with revenant/
gh pr list -R "$REPO" --state open --limit 200 --json number,headRefName \
  --jq '.[] | select(.headRefName | startswith("revenant/")) | "\(.number) \(.headRefName)"' |
while read -r num branch; do
  echo "closing PR #$num ($branch)"
  run gh pr close "$num" -R "$REPO" --comment "Nightly reset: closing Revenant demo PR."
done

# Delete any remaining revenant/* branches
gh api "repos/$REPO/git/matching-refs/heads/revenant/" --paginate --jq '.[].ref' |
while read -r ref; do
  [ -z "$ref" ] && continue
  case "$ref" in refs/heads/revenant/*) ;; *) continue ;; esac
  echo "deleting branch ${ref#refs/heads/}"
  run gh api -X DELETE "repos/$REPO/git/$ref"
done
echo "reset done"
