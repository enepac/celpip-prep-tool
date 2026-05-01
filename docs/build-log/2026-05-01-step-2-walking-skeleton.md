# Step 2 of 9 — Walking Skeleton + PostHog Signal

**Date completed:** 2026-05-01
**S3 tag:** Ship + Signal (Task 1 walking skeleton ships; PostHog activates Signal Channel 2)
**Status:** ⚠️ Partial — build passes and all files are in place; operator gate test and PostHog event verification are pending

## What was attempted

Build a complete end-to-end walking skeleton for Task 1 (prompt display, 30s prep timer, 90s recording, Whisper transcription, hardcoded score display with disclaimer) and instrument it with PostHog session recording and six named events. Run three tracer-bullet scripts in advance to validate the MediaRecorder API, Whisper API format compatibility, and Claude Sonnet JSON reliability before committing the skeleton.

## What was created

- `src/app/task-1/page.tsx` — full Task 1 flow as a client component: prompt display, 30s prep countdown, 90s recording with MediaRecorder, upload-and-transcribe call, hardcoded score display with disclaimer; six PostHog events instrumented inline
- `src/app/api/transcribe/route.ts` — server-only Next.js API route; accepts audio blob via FormData, calls Whisper (`whisper-1`), returns `{ transcript: string }`
- `src/types/score.ts` — `CelpipScore` TypeScript interface with four rubric criteria plus overall and reasoning fields
- `src/lib/posthog.ts` — PostHog client initialization (client-side, guarded against SSR)
- `src/app/providers.tsx` — App Router client provider that calls `initPostHog` on mount via `useEffect`
- `docs/hypotheses/phase-1-hypotheses.md` — three falsifiable hypotheses for Steps 2-4 with explicit falsification thresholds

## Files added/modified

| File | Change |
|------|--------|
| `src/app/task-1/page.tsx` | New — Task 1 walking skeleton with hardcoded score and PostHog events |
| `src/app/api/transcribe/route.ts` | New — Whisper transcription API route (`server-only`) |
| `src/types/score.ts` | New — `CelpipScore` interface |
| `src/lib/posthog.ts` | New — PostHog client initialization |
| `src/app/providers.tsx` | New — App Router client provider wrapping PostHog init |
| `src/app/layout.tsx` | Modified — wraps `children` in `<Providers>` |
| `package.json` | Modified — openai, @anthropic-ai/sdk, posthog-js, posthog-node promoted to production dependencies |
| `STATUS.md` | Modified — active day 1 recorded; Now updated to Step 3; tracer-bullet scripts logged in Killed |
| `docs/hypotheses/phase-1-hypotheses.md` | New — three hypotheses with falsification thresholds |

## Dependencies added

| Package | Version |
|---------|---------|
| `openai` | ^6.35.0 |
| `@anthropic-ai/sdk` | ^0.92.0 |
| `posthog-js` | ^1.372.5 |
| `posthog-node` | ^5.32.0 |

All four were previously installed in the repo; this step promoted them to production dependencies in `package.json`.

## Tracer bullets run

Three scripts were created under `scripts/tracer-bullets/`, run for their findings, and then deleted. They do not exist in the committed tree. Findings:

- **01-audio-record.html** (MediaRecorder API): Not yet operator-verified. Operator must open the file manually in a browser and confirm a `.webm` file downloads. Finding is a gate test input for Hypothesis 1.
- **02-whisper-transcribe.ts** (Whisper API format compatibility): Not yet run — depends on audio output from script 01. Hypothesis 2 result is pending.
- **03-claude-score.ts** (Claude Sonnet JSON reliability): Run 10 times. Result: 0/10 clean JSON. Claude Sonnet (`claude-sonnet-4-6`) wraps all JSON output in markdown code fences (` ```json ... ``` `) with a minimal system prompt. The JSON values themselves were valid, but `JSON.parse()` fails on fenced output. **Hypothesis 3 falsified.**

## Verification performed

- `npm run build` — exits 0; no TypeScript or lint errors
- `git status` — confirmed all expected files present as untracked/modified; no unexpected files
- Confirmed `HARDCODED_SCORE` constant exists in `src/app/task-1/page.tsx`
- Confirmed `PRACTICE ONLY` disclaimer is present in the result stage render
- Confirmed `scripts/tracer-bullets/` directory is absent from the working tree
- Confirmed `docs/hypotheses/phase-1-hypotheses.md` exists with three hypotheses
- Confirmed `STATUS.md` reflects active day 1 and Step 3 in Now

**Pending (operator action required):**
- Operator gate test: run the full Task 1 flow at `http://localhost:3000/task-1` in browser and confirm hardcoded score displays without manual intervention
- PostHog dashboard check: confirm all six events (`session_start`, `task_started`, `audio_record_started`, `audio_record_completed`, `transcription_completed`, `score_displayed`) appear after the gate test run

## What passed

- `npm run build` exits 0
- All Step 2 files exist in the working tree with expected content
- `server-only` guard present in `/api/transcribe/route.ts`
- Disclaimer text present in result stage
- `HARDCODED_SCORE` named and intentionally isolated for replacement at Step 3
- PostHog instrumentation wired: client init, provider, six event calls
- Tracer-bullet scripts deleted after findings captured

## What failed or was deferred

- **Hypothesis 3 falsified:** Claude Sonnet returns markdown-fenced JSON with a minimal system prompt. Step 3's scorer must use Anthropic structured outputs (tool_use or explicit JSON mode) or strip fences as post-processing. Decision required at Step 3 prompt design.
- **Hypothesis 2 pending:** Whisper format compatibility (webm vs format conversion) not yet confirmed. If transcoding is needed, it will be added to `/api/transcribe` in Step 3.
- **Operator gate test pending:** End-to-end Task 1 browser run not yet confirmed by operator.
- **PostHog event verification pending:** Requires operator to run the flow and check the PostHog dashboard.
- **Step 2 not yet committed:** All files exist in the working tree but have not been committed to `main`. Commit is a post-gate-test closeout action.

## Decisions made

- `HARDCODED_SCORE` is intentionally named (not anonymous) so grep can confirm it is replaced at Step 3 closeout.
- PostHog `session_recording` initialized with `maskAllInputs: false` — the only PII in the session is the spoken transcript shown in the UI; no typed passwords exist pre-auth. Revisit when Clerk is added at post-Step-9.
- Tracer-bullet scripts are throwaways: created, run, findings captured in hypotheses doc, then deleted. No tracer-bullet code enters the committed tree.
- Hypothesis 3 falsification locks in the requirement: Step 3 scorer must use structured outputs or fence-stripping. Plain-text JSON output from Claude is not reliable enough to ship.

## Operator should know

- The operator gate test (run Task 1 end-to-end in browser, confirm score displays) must happen before Step 2 is committed. If the skeleton does not walk without manual intervention, Hypothesis 1 is falsified and Step 3 scoping must account for it.
- `NEXT_PUBLIC_POSTHOG_KEY` and `NEXT_PUBLIC_POSTHOG_HOST` must be set in `.env.local` for PostHog to activate. If the key is absent, `initPostHog` silently no-ops — the app still works, but Signal Channel 2 is dark.
- Step 3 must use Anthropic structured outputs (tool_use or JSON mode) for the scorer — Hypothesis 3 falsification is a hard finding, not a soft concern.

## Lessons learned

- Claude Sonnet (`claude-sonnet-4-6`) wraps JSON in markdown fences 100% of the time when given a minimal system prompt. This is not a latent risk; it is confirmed behavior. Structured outputs via the Anthropic API are required for any production scorer.
- `MediaRecorder` MIME type fallback is necessary: `audio/webm;codecs=opus` is Chrome's preferred type but `isTypeSupported` must be checked; falling back to `audio/webm` and then to the browser default covers Firefox and Safari.
- PostHog's `__loaded` guard (`if (posthog.__loaded) return`) prevents double-initialization in React strict mode where `useEffect` fires twice in development.

## Next step

Step 3 of 9 — Real Claude scoring on Task 1 + golden-file tests. Replace `HARDCODED_SCORE` with a real `/api/score` route using Claude Sonnet with structured outputs (required by Hypothesis 3 falsification). Add golden-file tests against Section 12 rubric samples from `docs/01-celpip-speaking-rubric-reference-v1_2.md`.
