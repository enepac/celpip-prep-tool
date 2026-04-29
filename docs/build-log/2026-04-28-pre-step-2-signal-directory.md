# Pre-Step-2 — docs/signal/ Directory Structure

**Date completed:** 2026-04-28
**S3 tag:** Ship
**Status:** ✅ Complete

## What was attempted

Create the `docs/signal/` directory structure so that Channel 1 (Reddit/Facebook lurking) can begin immediately and Channel 4 (async interviews) is ready for day 14. The Step 1.5 build log flagged this gap: the foundation document referenced `docs/signal/` paths that did not exist.

## What was created

- `docs/signal/README.md` — directory overview: four channels, their files, and the weekly review obligation
- `docs/signal/lurking-notes.md` — Channel 1 log file with operating instructions, format spec, cull check, and a placeholder entry for the first lurking session
- `docs/signal/interviews/` — subdirectory for Channel 4 interview archives
- `docs/signal/interviews/README.md` — Channel 4 format spec: filename convention, file structure template, Mom Test framing guidance, cull check

## Files added/modified

- `docs/signal/README.md` — new
- `docs/signal/lurking-notes.md` — new
- `docs/signal/interviews/README.md` — new

## Dependencies added

None.

## Verification performed

- `ls docs/signal/README.md docs/signal/lurking-notes.md docs/signal/interviews/README.md` — all three paths confirmed present

## What passed

All three files created and non-empty.

## What failed or was deferred

- `docs/signal/session-notes.md` (Channel 2) not created — per spec, created when the channel goes live in Step 2.
- `docs/signal/in-product-feedback-YYYY-WW.md` (Channel 3) not created — per spec, created when the channel goes live in Step 4.

## Decisions made

None beyond what was specified. Respondent ID format (r001, r002, …) documented in interviews/README.md as a natural extension of the anonymization requirement.

## Operator should know

- Channel 1 lurking can begin immediately. The placeholder entry in `lurking-notes.md` should be updated with the actual Monday date of the first session.
- The Facebook group sources for Channel 1 are listed as "2-3 country-specific PR groups (locked at Step 2)" — a list of specific groups should be added to `lurking-notes.md` sources during Step 2.

## Lessons learned

Foundation documents that reference file paths should be accompanied by a setup step that creates those paths. Deferring directory creation to "when the channel goes live" works for channels that are gated on code (Channels 2 and 3), but Channel 1 starts on day 1 and writes to a file, so its path must exist before step 2.

## Next step

Step 2 of 9 — Walking skeleton of Task 1 (basic UI shell: task picker + prompt display)
