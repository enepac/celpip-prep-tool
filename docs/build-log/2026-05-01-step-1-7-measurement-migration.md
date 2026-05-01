# Step 1.7 of 9 — Measurement Migration to Step-Based + Active-Day Model

**Date completed:** 2026-05-01
**S3 tag:** Ship
**Status:** Complete

## What was attempted

Replace the calendar-day measurement model throughout the operating foundation with a step-based + active-day model, because the operator's working cadence is irregular and calendar pressure on no-work days produces false urgency and false slack.

## What was created

- New "Measurement Model" section in `docs/foundation/THE-HONEST-BUILD.md` defining the active-day counter, cycle-review format, falsifiability threshold, and soft viability trigger.
- Updated cull checks in Channels 1 and 3, per-cycle subtraction discipline, and Resolution 2 in THE-HONEST-BUILD.md.
- Corresponding summary updates to S3 Cull line, Falsifiability rule, Founder-Operator Lens Resolution 2, phase boundaries, plan section header, time tracking section, and lifecycle scopes section in CLAUDE.md.
- Active-day counter initialized at 0 in STATUS.md with increment instructions.

## Files added/modified

- `docs/foundation/THE-HONEST-BUILD.md` — added Measurement Model section; updated Channel 1 cull check, Channel 3 cull check, per-cycle subtraction, falsifiability rule, Resolution 2
- `CLAUDE.md` — updated Cull summary, falsifiability summary, Resolution 2 summary, phase boundaries block, plan section header, time tracking section, lifecycle scopes closing line
- `STATUS.md` — added active-day counter at top with increment protocol

## Dependencies added

None.

## Verification performed

- `git show --stat a8c35ee` confirmed commit touched exactly 3 files: CLAUDE.md (+14/-11), STATUS.md (+3/-0), docs/foundation/THE-HONEST-BUILD.md (+12/-6). Total: 29 insertions, 18 deletions.
- `git show a8c35ee -- CLAUDE.md` confirmed all six targeted CLAUDE.md locations were updated (Cull line, falsifiability rule, Resolution 2, phase boundaries, section header, time tracking, lifecycle scopes closing line).
- `git show a8c35ee -- docs/foundation/THE-HONEST-BUILD.md` confirmed Measurement Model section added after Brand section, Channel 1 cull check changed from "4 weeks" to "12 lurking sessions," Channel 3 cull check changed from "after a month" to "after 100 sessions post-Step-4," weekly subtraction changed to per-cycle subtraction, falsifiability threshold changed from "14-30 days" to "30 active project days," Resolution 2 rewritten to reference "14 active tester-usage days post-Step-4."
- Read STATUS.md confirmed counter line is present and initialized at 0.

## What passed

All six CLAUDE.md change targets applied. All six THE-HONEST-BUILD.md change targets applied. STATUS.md counter present. Commit a8c35ee is on main. No untracked or modified files remain.

## What failed or was deferred

None.

## Decisions made

- Active project day defined as any day with at least 1 hour of work logged. Counter lives in STATUS.md and is incremented manually by the operator at session start.
- Reviews renamed from weekly to cycle-based. One review file per completed step or natural batch. Filename format: `cycle-N-review.md` in `docs/reviews/`.
- Falsifiability threshold set at 30 active project days (was 14-30 calendar days).
- Channel 1 cull check set at 12 lurking sessions without a product decision changed (was 4 calendar weeks). Equivalent signal quantity, immune to idle time.
- Channel 3 cull check set at 100 sessions post-Step-4 with response rate below 15% (was "after a month"). Tied to usage volume, not time.
- Resolution 2 free-access window set at 14 active tester-usage days post-Step-4 (was 14 calendar days from day 15). Same intent; now immune to days when no testers use the product.
- Soft meta-review trigger: if active-day count exceeds 60 without reaching Step 9, write a viability/scope/pace review.
- Phase boundaries in CLAUDE.md replaced three calendar-bounded phases with four step-bounded phases. Phase 1 (Foundation, Steps 1-1.6): complete. Phase 2 (Walking Skeleton, Step 2): next. Phase 3 (Real Scoring + First Reality Contact, Steps 3-4). Phase 4 (Vertical Slices + Public Launch, Steps 5-9).
- These decisions are reflected in both THE-HONEST-BUILD.md (canonical) and CLAUDE.md (summary pointer). CLAUDE.md is the summary; THE-HONEST-BUILD.md is the source of truth.

## Operator should know

- STATUS.md active-day counter starts at 0 and must be incremented manually at the start of each session if the current calendar day has not yet been counted. It is the input to all active-day-based cull checks and the soft 60-day threshold.
- Cycle reviews replace weekly reviews. When a step closes, write a review file to `docs/reviews/cycle-N-review.md` rather than a calendar-week file.
- Phase 1 is now formally marked complete in CLAUDE.md. Phase 2 (Step 2, Walking Skeleton) is the active phase.

## Lessons learned

- Calendar-day measurement is a poor fit for solo irregular-cadence builds. Step-based phase tracking removes false urgency on no-work days. Active-day counting preserves time-accounting discipline without penalizing pause.
- Cull checks expressed in activity units (sessions, usage days) rather than calendar duration are harder to game passively and more directly tied to whether the product is actually being used.
- Migrating measurement model across two files (canonical + summary pointer) requires explicit diff review of both files in the same verification pass, or one file silently lags.

## Next step

Step 2 — Walking Skeleton of Task 1
