# Signal Subsystem Artifacts

This directory holds all artifacts produced by the Signal subsystem under The Honest Build (S3) operating foundation. Signal's job is to produce continuous candidate insight that can change a decision. Noise is everything else.

Full specification: `docs/foundation/THE-HONEST-BUILD.md` (Signal section).

## Four channels and their files

| Channel | Description | File/directory | Live from |
|---------|-------------|----------------|-----------|
| 1 | Reddit/Facebook lurking | `lurking-notes.md` | Day 1 |
| 2 | Session recordings (PostHog) | `session-notes.md` | Step 2 (created when channel goes live) |
| 3 | In-product feedback prompts | `in-product-feedback-YYYY-WW.md` (weekly exports) | Step 4 (created when channel goes live) |
| 4 | Async written interviews | `interviews/YYYY-MM-DD-respondent-id.md` (one per interview) | Day 14 |

## Weekly review obligation

Every weekly review (`docs/reviews/YYYY-MM-DD-weekly-review.md`) must report across all four channels: what was observed, what changed because of it, and what remains logged but unacted on. Two consecutive weeks where nothing changed because of Signal means the subsystem is broken.
