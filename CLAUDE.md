# CELPIP Speaking Prep — Build Instructions for Claude Code

This file is read automatically by Claude Code at the start of every session in this repo. It is the project's working contract.

## What this project is

An AI-powered CELPIP Speaking practice tool. Solo SaaS. Target audience: ESL candidates from the Philippines, India, Nigeria, China, and Iran preparing for Canadian Express Entry / PR / citizenship.

Competitive moat: rubric-accurate AI feedback grounded in Paragon's official CELPIP Speaking rubrics across the four criteria (Content/Coherence, Vocabulary, Listenability, Task Fulfillment) and the eight task types. Generic English feedback is competitor noise; rubric-grounded feedback is the product.

## Locked decisions — do not propose changes

- **Scope:** CELPIP Speaking only in v1. No Writing, Reading, or Listening.
- **Stack:** Next.js 15 (App Router) + TypeScript + Tailwind + ESLint. Supabase or Neon for Postgres (decide at Step 7). Vercel for hosting. OpenAI Whisper for transcription. Claude Sonnet for scoring.
- **Auth:** Clerk, deferred to post-Step 9. Do not add auth scaffolding before then.
- **Pricing:** $19/month or $59/3 months. Stripe. Not in v1 build — add after first 5 paying-intent users.
- **Disclaimer:** Every score display must clearly state the feedback is practice-only and not an official CELPIP score. This is non-negotiable.

If something seems to require changing one of the above, stop and ask the operator before acting.

## Build plan

Eleven total steps in the active sequence:

- Step 0: CLAUDE.md (this file)
- Step 1: Next.js skeleton + documenter subagent
- Step 2: Basic UI shell (task picker, prompt display)
- Step 3: Audio recording in browser (MediaRecorder API)
- Step 4: Upload route for audio blobs
- Step 5: Whisper transcription integration
- Step 6: Scorer system prompt (built from docs/01-celpip-speaking-rubric-reference-v1_2.md)
- Step 7: Scorer API route (Claude Sonnet, structured JSON output)
- Step 8: Score display UI with all four criteria + per-criterion feedback
- Step 9: Deploy to Vercel

After Step 9: beta testers, then Clerk auth, then Stripe.

## File organization conventions

- App routes: `src/app/`
- Reusable components: `src/components/`
- Server-only code (API routes, AI calls): `src/app/api/` or `src/lib/server/`
- Client-only code (recording, UI state): `src/lib/client/` or co-located in components
- Shared types: `src/types/`
- AI prompts and rubric content: `src/lib/prompts/`
- Tests: co-located as `*.test.ts` next to the file under test

## Coding standards

- TypeScript strict mode. No `any` without a comment explaining why.
- Server-only code never imported into client components. Use `import "server-only"` at the top of server modules.
- All AI feedback uses structured outputs (JSON schemas). Never free-form text from the model.
- Environment variables go in `.env.local` (gitignored). Document required vars in `.env.example` (committed).
- No secrets in code, ever. No API keys in commits.

## What to do when something breaks

1. Verify before modifying — run a diagnostic command before changing code
2. Smallest diagnostic first — one file, one command, before broader changes
3. Trust verifying commands, not rendered display
4. If a fix fails twice on the same channel (terminal, IDE, browser), switch channels
5. Dry-run multi-file operations
6. "Cosmetic" or "non-blocking" framings are forbidden without evidence

## Documentation discipline

After each numbered step completes, the documenter subagent (`.claude/agents/documenter.md`) writes a log to `docs/build-log/step-NN-<slug>.md`. Do not skip this — the build log is how the operator stays oriented across sessions.

## Reference documents in docs/

- `01-celpip-speaking-rubric-reference-v1_2.md` — the master rubric. This is the foundation of the scorer system prompt. Treat it as the authoritative source for what counts as Level 9 vs Level 12, etc.
- `02-celpip-speaking-prompts-library-v1_0.md` — practice prompts for the 8 task types. Source for the prompt picker UI.
- `03-celpip-calibration-delta-v1_0.md` — calibration findings. The v1.3 punch list inside is deferred until after beta. Do not roll those edits in now.

## Out of scope for v1

Do not propose, suggest, or build:
- Writing, Reading, or Listening practice
- Multimodal audio scoring (text-only Listenability proxies are fine for v1, with disclosure)
- User accounts (until post-Step 9)
- Payments (until post-beta)
- Mobile apps
- Internationalization
- Analytics dashboards
- Admin panels

## When in doubt

Ask the operator. Defaulting to "do less" is correct. The day-30 ship target beats every polish instinct.
