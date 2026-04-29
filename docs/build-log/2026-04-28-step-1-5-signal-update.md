# Step 1.5 — Foundation Signal Subsystem Update

**Date completed:** 2026-04-28
**S3 tag:** Ship
**Status:** ✅ Complete

## What was attempted

Sync the repo's foundation artifacts with the updated Signal subsystem specification. The operator revised the Signal subsystem from "3 live interviews/week" to a four-channel async/observational stack — driven by the constraint that live synchronous interviews are not feasible for this project. The underlying Signal discipline (continuous candidate signal, weekly falsifiable reviews) is preserved; only the form changed.

## What was created

No new files. Two existing files updated.

## Files added/modified

- `docs/foundation/THE-HONEST-BUILD.md` — Signal section replaced: four-channel specification (lurking, session recordings, in-product prompts, async interviews), per-channel cull checks, weekly review reporting requirement, explicit exclusion of live interviews
- `CLAUDE.md` — Signal line in the Operating Foundation summary updated to match the four-channel summary

## Dependencies added

None.

## Verification performed

- `git diff docs/foundation/THE-HONEST-BUILD.md` — confirmed only the Signal subsystem body changed; Ship, Cull, and all other sections untouched
- `git diff CLAUDE.md` — confirmed only the Signal bullet changed; all other content untouched
- `wc -l docs/foundation/THE-HONEST-BUILD.md` — 107 lines (above 80-line threshold)
- `grep -c "four channels" docs/foundation/THE-HONEST-BUILD.md CLAUDE.md` — phrase present in both files

## What passed

All verifications clean. Diffs show surgical changes to Signal sections only.

## What failed or was deferred

None.

## Decisions made

- **Live interviews excluded from the Signal stack.** Operator constraint: synchronous interviews not feasible for this project. The four async/observational channels (lurking, session recordings, in-product prompts, async written interviews) carry the full Signal load. This is a foundation-level decision recorded here and in the canonical file.
- **S3 tag for this step is Ship**, not Signal, because the step updates foundation infrastructure (the operating foundation document and CLAUDE.md) rather than operating the Signal subsystem itself.

## Operator should know

- `docs/signal/` directory does not yet exist. Channels 1–4 reference file paths under `docs/signal/` for logging notes, session observations, and interview archives. That directory structure should be created before the first day of lurking (Channel 1 starts day 1, so before or alongside Step 2).
- Channel 2 (PostHog) is instrumented in Step 2. No action needed before then.
- Channel 3 (in-product prompts) ships with Step 4. No action needed before then.
- Channel 4 (async interviews) ramps from day 14. Recruitment framing and question list can be drafted any time before then.

## Lessons learned

Foundation documents should be updated synchronously when operator constraints change — stale canonical files are worse than no canonical files, because they create false confidence in the stated discipline.

## Next step

Step 2 of 9 — Walking skeleton of Task 1 (basic UI shell: task picker + prompt display)
