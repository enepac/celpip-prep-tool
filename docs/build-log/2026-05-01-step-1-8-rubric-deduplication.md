# Step 1.8 of 9 — Resolve Rubric File Duplication

**Date completed:** 2026-05-01
**S3 tag:** Cull
**Status:** Complete

## What was attempted

Three canonical reference documents existed in two locations each — the active top-level `docs/` path and a mirrored `docs/research/synthesis/` path created in the same initial commit. The goal was to establish one unambiguous canonical path per document, archive older drafts with no active references, and delete true duplicates with no archival value.

## What was created

- `docs/research/archive/` directory — landing zone for older drafts that have no active references but warrant preservation for historical context
- Three files moved into archive with full git history preserved
- Three true duplicate files removed

## Files added/modified

- `docs/research/archive/01-celpip-speaking-rubric-reference-v1.1.md` — moved from `docs/research/synthesis/`; older rubric version (1301 lines), no active references
- `docs/research/archive/01-celpip-speaking-rubric-reference.md` — moved from `docs/research/synthesis/`; earliest rubric draft (891 lines), no version suffix, no active references
- `docs/research/archive/celpip-speaking-rubric-v0.1.md` — moved from `docs/` top-level; very early 178-line draft, no active references
- `docs/research/synthesis/01-celpip-speaking-rubric-reference-v1_2.md` — deleted; content identical to `docs/01-celpip-speaking-rubric-reference-v1_2.md`
- `docs/research/synthesis/02-celpip-speaking-prompts-library-v1_0.md` — deleted; content identical to `docs/02-celpip-speaking-prompts-library-v1_0.md`
- `docs/research/synthesis/03-celpip-calibration-delta-v1_0.md` — deleted; content identical to `docs/03-celpip-calibration-delta-v1_0.md`

## Dependencies added

none

## Verification performed

- `git show 785487c --stat` — confirmed 6 files changed, 2310 deletions, 0 insertions; all three synthesis-path files deleted, three older drafts renamed into archive
- `ls docs/research/archive/` — confirmed three archived files present
- `wc -l` on all three canonical files — confirmed 1692 / 345 / 273 lines, matching pre-step content exactly
- `grep -r "docs/research/synthesis"` across CLAUDE.md, build-log, and foundation — returned no matches; no active references broken
- `grep -r "celpip-speaking-rubric-v0.1"` across CLAUDE.md and build-log — returned no matches; top-level draft had no active references

## What passed

- Canonical paths confirmed as the sole copies of all three active reference documents
- No active references in CLAUDE.md, build logs, or foundation docs pointed to the deleted or moved files
- Git history preserved for archived files via `git mv`
- Post-dedup directory structure is unambiguous: `docs/01-*`, `docs/02-*`, `docs/03-*` are the authoritative files; `docs/research/archive/` holds superseded drafts

## What failed or was deferred

none

## Decisions made

- `docs/research/archive/` chosen as the archive destination rather than deletion for the older drafts; older versions have no current use but may serve as a diff reference when the v1.3 calibration punch list is applied post-beta. Consistent with the deferred-scope posture in CLAUDE.md for `docs/03-celpip-calibration-delta-v1_0.md`.
- True duplicates (identical content to canonical top-level files) were deleted outright, not archived. Archiving identical content adds no value and reintroduces the ambiguity being resolved.
- No reference updates required. All active paths were already pointing to the top-level canonical files — the synthesis copies were never referenced from code or configuration.

## Operator should know

- The `docs/research/synthesis/` directory still exists but now contains only the `archive/` subdirectory (the three duplicate files that were there have been removed). If that empty-ish parent directory causes confusion, it can be removed in a housekeeping pass, but there is no functional need to do so now.
- The v1.3 calibration punch list in `docs/03-celpip-calibration-delta-v1_0.md` remains deferred until post-beta, per CLAUDE.md. The deduplication did not change that decision.

## Lessons learned

- The synthesis copies were created in the same commit (47fc1f4) as the top-level canonical files. They were likely an artifact of the initial repo scaffold generating both a working-docs location and a research location without differentiating which was canonical. Checking for implicit duplicates at scaffold time would catch this earlier.
- `docs/research/synthesis/` was one level shallower than the initial investigation prompt assumed (`docs/research/synthesis/` not `docs/research/03-unofficial-teardowns/synthesis/`). Running `ls` to confirm the actual directory structure before acting on assumed paths saved a failed `git mv`.

## Next step

Step 2 — Walking Skeleton of Task 1
