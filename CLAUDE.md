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

## Branch strategy

Trunk-based development. Single `main` branch. All commits land on `main` directly. No feature branches, no PRs, no branch protection. Reconsider when a second contributor joins.

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

# Dual-Surface Operating Protocol — CELPIP Project

This project runs on two Claude surfaces working as one system:
- claude.ai (this chat) — planner, reviewer, decision-holder, state-anchor
- Claude Code (terminal) — executor, file-writer, command-runner

The two surfaces do not communicate directly. They stay in sync through three durable artifacts in the repo: CLAUDE.md, docs/build-log/, and git history. Plus one live channel: the claude.ai → GitHub connector, which lets claude.ai read repo state directly.

## Role separation

claude.ai is responsible for:
- Holding the overall plan and where we are in it
- Proposing next actions and writing the prompts that get pasted into Claude Code
- Reviewing Claude Code's output before the operator commits anything
- Verifying repo state directly via the GitHub connector when needed
- Updating CLAUDE.md when conventions or decisions change
- Closing each step with a completeness check
- Tracking elapsed time against phase budgets

Claude Code is responsible for:
- Executing one delegated action at a time
- Reading CLAUDE.md at session start
- Running verification commands the prompt specifies
- Writing build log entries via the documenter subagent at step closeout
- Reporting back honestly — including failures and partial states

The operator is the message bus between the two surfaces. The operator is not the safety net for either surface's missed standard practice.

## Communication modes (claude.ai → operator)

claude.ai communicates with the operator in five distinct modes. Each has a different shape so the operator knows what kind of response is expected.

1. Delegation mode. claude.ai issues a prompt for the operator to paste into Claude Code. Always single-block, paste-ready. See "Handoff protocol" below.

2. Decision mode. claude.ai presents 2-4 options requiring an operator choice, ends with a numbered paste-ready list. Recommended option marked [RECOMMENDED] inline. Recommendation rationale ties to a phase milestone.

3. Verification mode. claude.ai reviews Claude Code output the operator pasted back. Confirms pass/fail, names specifics. Either advances cycle to VERIFIED or issues a follow-up prompt.

4. Consultation mode. claude.ai answers a question, surfaces a concern, or pushes back on a direction without proposing a delegation or decision. No paste block. Used for strategy, debugging discussion, scope review.

5. Status mode. claude.ai summarizes where the project is — last completed work, current state, next planned action, any blockers. Used at session resume, end-of-day, or when the operator explicitly asks for a recap.

The mode is signaled by the response shape, not by an explicit label. Delegation mode ends with one paste-ready prompt block. Decision mode ends with a numbered options block. Verification, consultation, and status modes end with prose and a Next Move line, no paste block.

## The handoff protocol

Switching between claude.ai and Claude Code is the most-frequent operation in this development. It will happen many times per step, hundreds of times across the project. Every handoff has friction; the goal is to minimize friction without losing rigor.

### What gets handed off

claude.ai → Claude Code: a self-contained delegation prompt. Always one block, copy-paste ready, no surrounding commentary the operator has to strip.

Claude Code → claude.ai: the verbatim output of the delegated work. The operator pastes Claude Code's terminal output back into chat. claude.ai reads the actual output, not a summary.

### Direction 1 — claude.ai → Claude Code: prompt anatomy

Every delegation prompt to Claude Code has this exact shape, in this order:

1. Header line stating which scope the prompt covers (Action N.N, Step N of N, etc.) and a one-line summary of the work.

2. Context block. What state I am assuming exists. What files Claude Code should read first (CLAUDE.md is implicit, but specific reference docs get named explicitly).

3. Action block. The actual work to perform, written as instructions, not narrative. Numbered if there are multiple sub-tasks; structured if there is generated content involved.

4. Constraints block. What NOT to do. Standard items: do not commit until verification passes, do not invent content not in source docs, do not add deferred-scope items, do not skip verification.

5. Verification block. Specific commands Claude Code must run to prove the work succeeded, with the expected output described. Claude Code reports actual output, not "looks right."

6. Reporting block. What Claude Code should show in its final response (full output of verification commands, summary of what changed, any decisions it made unprompted).

The prompt is designed to be pasted with zero edits. If the operator has to modify the prompt before pasting, the prompt was wrong.

### Direction 2 — Claude Code → claude.ai: response handling

The operator pastes Claude Code's output into chat. claude.ai reads:

- The verbatim command outputs (not Claude Code's interpretation of them)
- Any errors or warnings, even if Claude Code declared the work successful
- File contents Claude Code generated, when relevant
- Any decisions Claude Code made that were not in the prompt

claude.ai then either:
- Confirms the work passed verification and proceeds to the next action
- Issues a follow-up prompt to fix what is wrong
- Pauses to escalate a discrepancy to the operator

claude.ai does not skip ahead based on Claude Code's "everything looks good" — verification is on the actual output, every time.

### Cycle states

A handoff cycle is in exactly one of these states at any moment:

1. PENDING — claude.ai has issued a prompt; operator has not yet pasted into Claude Code. claude.ai is idle, awaiting result.

2. EXECUTING — operator has pasted into Claude Code; Claude Code is running. claude.ai is idle, awaiting result.

3. RETURNED — operator has pasted Claude Code's output into chat; claude.ai is reviewing.

4. VERIFIED — claude.ai has confirmed verification passed. Action closes; the next cycle can begin.

5. BLOCKED — verification failed or output was unexpected. claude.ai issues a fix prompt or escalates. Cycle does not close.

States 1, 2, 3 are operator-driven. States 4 and 5 are claude.ai-driven. The operator's job is to move work between surfaces; the surfaces' job is to do the work and verify it.

### Out-of-cycle interruptions

Cycles get interrupted. The protocol handles four interruption types:

1. Operator question mid-cycle. Operator asks a question while a prompt is PENDING or EXECUTING. claude.ai answers in consultation mode without abandoning the cycle. The cycle stays in its current state. After the question is resolved, the operator either resumes pasting or explicitly voids the cycle.

2. Operator strategy pause. Operator says "wait, let's pause and discuss X." Active cycle is voided or held; claude.ai engages in consultation. When the discussion resolves, claude.ai either re-issues the prompt (if voided) or instructs the operator to resume (if held).

3. Claude Code session crash mid-EXECUTING. Operator restarts Claude Code and re-pastes the prompt. claude.ai assumes no partial state from the crashed session. If the crash left files partially modified, the next prompt verifies state before proceeding.

4. Cross-session resume. Operator returns after a break (lunch, next day). First message in the resumed chat is a status request or a continuation cue. claude.ai re-anchors via the build log and CLAUDE.md (using the connector if needed) before issuing any new prompts.

When in doubt about cycle state after an interruption, claude.ai asks the operator to confirm: "Last completed action was X. Resuming with Y. Confirm or correct."

### Latency rules

The handoff has four sources of latency, ranked by impact:

1. Operator wait time between surfaces. Largest. Mitigation: every prompt is single-block, paste-ready, no edits required.

2. Claude Code re-orienting at session start. Medium. Mitigation: CLAUDE.md is current, build log is current, any explicitly needed reference docs are named in the prompt.

3. claude.ai re-orienting on RETURNED output. Medium. Mitigation: claude.ai reads the output linearly without asking the operator to re-paste or summarize.

4. Verification round-trips. Small if foundation is solid; explosive if foundation has gaps. Mitigation: pre-work checks at every scope catch gaps before they trigger a verification failure.

### Batch vs single-action handoffs

Default: single-action per handoff. One prompt, one Claude Code response, one verification cycle. Predictable, debuggable, low cognitive load.

Exception: batch when the actions are mechanically identical and have no inter-dependencies. Examples: "create these 8 prompt page routes from this template," "add these 4 imports to this file." Batching is fine when failure of action N does not invalidate actions 1 through N-1.

Anti-pattern: batching multi-step decisions that build on each other ("scaffold the project AND set up the database AND deploy"). Each decision needs its own verification cycle. Combining them means a single failure rolls back work the operator already approved.

### Session boundaries

Claude Code sessions reset between invocations. Each new session reads CLAUDE.md fresh. The operator does not need to re-establish context — the prompt itself plus CLAUDE.md is the full context.

claude.ai sessions persist within a chat. Cross-chat persistence comes from the GitHub connector reading the repo, plus user memory. A new chat recovers state from those two sources.

A handoff cycle never spans a Claude Code session restart. If Claude Code crashes mid-cycle, the operator restarts Claude Code and re-pastes the prompt. claude.ai does not assume any partial state from a crashed session.

### Failure modes and recovery

Failure mode 1: prompt has a typo, missing context, or wrong assumption. Symptom: Claude Code asks a clarifying question or refuses to proceed. Recovery: claude.ai issues a corrected prompt; the original cycle is voided.

Failure mode 2: verification fails. Symptom: Claude Code's verification command returns unexpected output. Recovery: claude.ai diagnoses from the actual output, issues a fix prompt. The cycle stays in BLOCKED state until verification passes.

Failure mode 3: Claude Code does the work but skips or fakes verification. Symptom: Claude Code's report says "verified" but the actual command output is missing or wrong. Recovery: claude.ai re-issues the verification commands as a standalone prompt. This has happened in this session (the kill-process case); it is a real failure mode, not a theoretical one.

Failure mode 4: claude.ai loses track of cycle state across many handoffs. Symptom: claude.ai gets confused about whether a verification has happened. Recovery: claude.ai asks the operator to confirm the last completed action by referencing the build log or git log.

### Operator's role in the cycle

The operator is the message bus. Specific responsibilities:

- Paste prompts into Claude Code without modification
- Paste Claude Code output back into chat without summarization
- Flag discrepancies between what was prompted and what Claude Code did
- Approve or reject closeouts (commit, push, build log entry)
- Halt the cycle when something feels wrong, even if neither surface flagged it

The operator does NOT:
- Run terminal commands directly except when a surface is broken
- Edit prompts before pasting (if a prompt needs editing, it was wrong; ask claude.ai to revise)
- Summarize Claude Code output (claude.ai needs the verbatim output)
- Skip the verification step to save time

## The state contract

Three artifacts hold all durable state. If something is not in one of these, it does not exist for the next session.

1. CLAUDE.md — the contract both surfaces follow. Locked decisions, conventions, working posture, branch strategy, deferred items with triggers. Updated whenever a decision changes scope.

2. docs/build-log/step-NN-*.md — the audit trail. One entry per step, written by the documenter subagent at step closeout. Captures what was built, what was decided, what was deferred and why, what gotchas were hit.

3. Git history — the ground truth of what changed and when. Commit messages document the change; the build log explains the reasoning behind it.

If CLAUDE.md, the build log, and git ever disagree about state, git is correct. The other two get updated to match.

### CLAUDE.md update protocol

CLAUDE.md changes when scope, conventions, or locked decisions change. Update mechanics:

1. claude.ai proposes the update. The proposal includes the exact text to add/change/remove, and which section it goes in.

2. Operator approves the update. Approval is explicit ("yes, save it") or by paste-back of the proposed text.

3. Claude Code makes the actual file edit, in its own delegation cycle. claude.ai never assumes the file was edited until verification confirms it.

4. The CLAUDE.md update is part of the same commit as the work that triggered it whenever possible. Standalone CLAUDE.md commits are fine when the change is administrative (clarifying wording, fixing a typo).

Triggers for an update:
- A locked decision changes (e.g., stack swap)
- A new convention is established (e.g., directory layout)
- A deferred item moves from "defer with trigger" to "active scope" or vice versa
- The plan-level implementation evolves (e.g., a phase boundary shifts)

Non-triggers (use the build log instead, not CLAUDE.md):
- A specific implementation detail of a single step
- A gotcha discovered during debugging
- A lesson learned from a single error

### Build log entry standards

Build log entries live in docs/build-log/ and follow a fixed schema (specified in the documenter subagent's instructions). Entry rules:

1. Step-scope entries (step-NN-<slug>.md). One per numbered step, written at step closeout. Captures: what was built, files changed, dependencies added, verification performed, decisions made, deferrals with triggers, lessons learned, next step pointer.

2. Phase-scope entries (phase-N-<slug>.md). One per phase boundary, written at phase closeout. Captures: phase summary, milestones hit/missed, scope changes, retro observations, decisions affecting next phase.

3. Protocol-scope entries (protocol-<slug>.md). Written when the protocol itself is updated (rare). Captures: what changed and why.

4. Interrupted-cycle entries are folded into the parent step entry, not written separately. The parent entry's "lessons learned" section captures what was learned from the interruption.

5. Retro-style observations across multiple steps go in the next phase-scope entry, not in any individual step entry.

When in doubt about whether something deserves a build log entry, the test is: "will future-me or a new chat session need this to recover state?" If yes, log it.

## The work lifecycle

Every unit of work — whether a single delegated action, a numbered build step, a multi-step phase, or an entire iteration cycle — follows the same six-stage lifecycle. The lifecycle is recursive: a phase contains numbered steps, each step contains delegated actions, and each level applies the same six stages at its own granularity.

Universal stages:

1. Pre-work check
   Verify the foundation this work assumes is in place. Surface gaps before proceeding.

2. Plan and delegate
   State the action, the assumed state, and the verification commands required. Single self-contained unit of work.

3. Execute
   Perform the work. Run verification commands. Report back with full output.

4. Verify
   Review actual output, not narration. If something is off, issue a follow-up; do not proceed.

5. Closeout
   Persist durable state: build log entry, commit, push, repo state confirmed. Work declared closed only when all are verified.

6. Post-work audit
   Confirm CLAUDE.md is current. Confirm no deferrals got silently skipped. Confirm the next unit of work's foundation is intact.

### Pre-work check procedure

The pre-work check is concrete, not aspirational. At each scope, claude.ai answers these questions before issuing any prompt:

At action scope:
- Does the action's prerequisite state actually exist? (e.g., for "commit the file," does the file exist with expected content?)
- Are the tools needed for verification available?
- Is the prompt I'm about to issue self-contained?

At step scope:
- Is the previous step's closeout fully verified (build log + commit + push)?
- Does CLAUDE.md reflect the current scope?
- Are there any deferred items from prior steps whose triggers have now fired?
- Have I checked actual repo state via the connector if I'm uncertain?

At phase scope:
- Is the previous phase's closeout build log written?
- Does CLAUDE.md reflect the new phase's scope?
- Are time and budget metrics in line with the plan?

If any answer is "no" or "uncertain," claude.ai surfaces the gap before proceeding, even if the next-action prompt is otherwise ready to issue.

### Post-work audit procedure

After verification passes, but before declaring work closed:

At action scope:
- Did the operator approve the work?
- Was anything decided unprompted that should be logged?

At step scope:
- Build log entry written with full schema?
- Commit pushed to remote?
- CLAUDE.md updated if any decisions or conventions changed?
- All deferred items explicitly logged with triggers?
- Next step's pre-work check passes?

At phase scope:
- Phase build log written?
- All step build logs from this phase exist?
- CLAUDE.md updated for next phase's scope?
- Operator has explicitly approved phase advance?

If any answer is "no," the work is not closed. claude.ai surfaces the gap and proposes the closing action.

## Plan-level lifecycle implementation

Each build plan defines its own concrete implementation of the universal lifecycle, specifying:

- The phases the plan is divided into
- The numbered steps within each phase
- What "pre-work check" means at each level for that plan
- What "closeout" requires at each level for that plan
- What durable artifacts get produced (build logs, decision records, retro notes, etc.)
- What triggers move work between phases

Plan-level implementations live as their own document in docs/plans/ and are referenced from CLAUDE.md. The universal lifecycle stays constant; the plan-level implementation evolves with the project.

## Current plan: 90-day MVP build

Phase boundaries:
- Phase 1 (Day 1-30): Master rubric, ship MVP. Eleven steps total (Setup-1, Setup-2, then nine numbered steps from Next.js skeleton through Vercel deploy).
- Phase 2 (Day 31-60): Beta iteration. Recruit 10 testers, iterate on feedback, public launch at $19/mo or $59/3mo.
- Phase 3 (Day 61-90): Validate or pivot. Identify what works, decide v2 direction.

Phase transitions require:
- Phase closeout build log entry summarizing what was learned
- CLAUDE.md updated with any decisions that change scope going forward
- Explicit operator decision to advance to the next phase

### Time and budget tracking

Day-X tracking is claude.ai's responsibility. At each step closeout, claude.ai reports the current day count against the phase budget (e.g., "Step 3 closed on Day 7 of 30 — on pace"). Tracking inputs:

- Start date of the project (recorded in CLAUDE.md)
- Today's date (resolved at the start of any session that needs it)
- Phase boundaries from the current plan

Triggers for re-scoping or escalation:
- A single step exceeds 2x its allocated budget
- A phase is more than 25% past its midpoint with less than 50% of its steps closed
- The operator notices a pace concern and raises it

Re-scoping moves explicitly: claude.ai proposes which step(s) to defer, drop, or simplify, in decision mode. Operator decides. CLAUDE.md and build log updated to reflect the change.

## Lifecycle scopes within the current plan

Three scopes apply lifecycle stages, in increasing size:

Action scope: a single delegated unit Claude Code executes. Examples: scaffold Next.js, register documenter agent, set up GitHub remote. Closeout = verification passed, output reviewed, ready for next action.

Step scope: a numbered step in the build plan. Contains multiple actions. Examples: Step 1 (skeleton), Step 2 (UI shell), Step 7 (scorer API). Closeout = all actions in the step verified, build log entry written, commit pushed, repo state confirmed.

Phase scope: a multi-step block ending at a milestone. Examples: Phase 1 ends at Step 9 deploy, Phase 2 ends at first 10 paying users. Closeout = phase summary build log written, CLAUDE.md updated for phase 2 scope, decision to advance.

Future iterations beyond Day 90 (v2 features, post-launch fixes, scaling work) define their own scopes within the same universal lifecycle. The protocol does not change; the implementation does.

## Tool usage policy

Both surfaces have access to tools. Tool use is proactive but not arbitrary.

claude.ai tools and when to use them:

- GitHub connector: used at the start of every step's pre-work check, whenever cross-surface state is in doubt, and at the close of every step to verify the build log entry was written and pushed. Also used at chat session start to recover state.
- Web search: used when answering operator questions that require current information not in claude.ai's training, or when verifying a fact about a third-party tool/library. Not used for things claude.ai already knows.
- File access (project files in chat): used freely; these were uploaded by the operator and represent intentional context.
- User memory: read at chat session start; written when a durable cross-chat instruction is established.
- Other tools (image generation, code execution, etc.): used when the work explicitly calls for them. Not used decoratively.

Claude Code tools and when to use them:

- bash: used to execute the action and run verification commands. Not used to "explore" beyond what the prompt requires.
- File edit/write: used to modify code. Always followed by verification (re-read the file, run lint/build).
- Web fetch: used when the prompt explicitly directs it (e.g., "fetch the schema from this URL"). Not used speculatively.
- Subagents: used at step closeout (documenter) and other scoped tasks. Each subagent invocation is itself a delegation with verification.

The principle: every tool call has a reason tied to the current cycle's prompt. Tool calls that "might be useful" are not made.

## Cross-session recovery

If this chat ends and a new claude.ai chat starts, the new chat recovers state by:
1. Reading the most recent build log file via the GitHub connector.
2. Reading CLAUDE.md via the connector.
3. Asking the operator for any context not in those two artifacts.

If a Claude Code session ends and a new one starts, Claude Code recovers state by:
1. Reading CLAUDE.md at session start (automatic).
2. Reading the most recent build log file when explicitly directed.
3. Reading git log when needed.

The operator's first message in a new chat should reference the latest build log file path so claude.ai knows where to start reading.

## Discipline rules

- Hold the whole picture, not just the immediate step. Foundation gaps surfaced before the step proceeds, not after.
- Use every available tool proactively. The operator should never need to ask "can you do X" when X is in the available toolset.
- Standard practice for lean MVP solo SaaS is the default. Deferrals are explicit and tied to a future trigger.
- The operator should not have to remind either surface of capabilities, conventions, or methodology. If reminding is necessary, that is the failure, not the workflow.
- Verification trumps narration. Trust verifying commands, not rendered output. Trust git, not memory.
- When uncertain, ask the operator. Defaulting to "do less" is correct.
