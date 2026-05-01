# Phase 1 Hypotheses (Steps 2-4)

**Phase scope:** Steps 2-4. Walking skeleton of Task 1, real Claude scoring, ship to first 3 testers.
**Written:** 2026-05-01
**Review at end of:** Step 4 (when 3 testers have completed Task 1).

## Hypothesis 1: The walking skeleton works without manual intervention

**Bet:** Operator can record their own Task 1 response in the actual browser, end-to-end, and see a score displayed without any manual step (no copy-paste, no terminal command, no debugging).

**Measurement:** Operator runs the flow at end of Step 2; either it works or it doesn't.

**Falsification threshold:** Any manual intervention required = hypothesis falsified, skeleton is not yet walking.

## Hypothesis 2: Whisper API handles browser audio format directly

**Bet:** Audio captured by MediaRecorder in Chrome (likely .webm/Opus) can be sent directly to Whisper API without server-side transcoding.

**Measurement:** Tracer bullet 2 results.

**Falsification threshold:** If transcoding is required, hypothesis falsified — note the format conversion in Step 2's build log and add the transcoding step to the production pipeline.

## Hypothesis 3: Claude returns valid JSON with minimal prompting

**Bet:** Claude Sonnet, given a 3-4 sentence system prompt requesting JSON with four numeric fields, returns parseable JSON without preamble or markdown fences ≥90% of the time.

**Measurement:** Run tracer bullet 3 ten times. Count clean-JSON responses.

**Falsification threshold:** <90% clean = Step 3's real prompt must explicitly handle output formatting (force JSON mode, structured outputs, or post-processing).
