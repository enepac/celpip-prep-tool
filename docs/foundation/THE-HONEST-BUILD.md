# The Honest Build — Operating Foundation

This is the canonical statement of the operating foundation for the CELPIP Speaking Prep tool. All project instructions and CLAUDE.md reference this file. Edit here; summaries elsewhere are pointers.

---

## Brand

**The Honest Build** is the operating posture for this project. It means: ship real things to real people, learn from signal, and cut what does not earn its keep. No padding the build, no hedging the feedback, no features in search of users.

## Operating Loop: Ship-Signal-Cull (S3)

The S3 loop runs in sequence, every week, from day one through launch and beyond.

```
Ship → Signal → Cull → (repeat)
```

### Ship

Get working software in front of users as fast as possible. Shippable increments only — no dark scaffolding.

Constituent disciplines:

- **Walking skeleton:** The thinnest possible end-to-end path through the system is the first thing built. In this project: record audio → transcribe → score → display. Everything else hangs off that spine.
- **Vertical slicing:** Each increment cuts through all layers (UI, API, AI, data) rather than building one layer at a time. A half-feature shipped is more signal than a full layer built.
- **Tracer bullets:** Use real infrastructure from day one. Stub the AI in dev, but wire real Whisper and real Claude as early as possible. Mocked paths hide integration failures.
- **WIP ≤ 2:** No more than two items in flight at once. This is a hard cap. If a third item starts, one of the two in flight must ship, pause, or be killed first.

### Signal

Collect information that can change a decision. Noise is everything else.

The Signal subsystem produces continuous candidate signal from day 1 via four channels operating in combination. No single channel is sufficient; the combination is the discipline. Total Signal time budget at peak: approximately 5 hours per week.

**Channel 1 — Reddit/Facebook lurking.** 90 minutes per week (30 min × 3 sessions), starting day 1. Sources: r/CELPIP, r/canadaexpressentry, r/ImmigrationCanada, plus 2-3 country-specific PR Facebook groups (locked at Step 2). Read only — no posting yet. Notes logged to `docs/signal/lurking-notes.md`, dated weekly, categorized (frustration / tool gap / pricing signal / outcome anxiety / other). Cull check: 4 weeks without a product decision changed → restructure or kill.

**Channel 2 — Session recordings.** PostHog free tier (or equivalent: Microsoft Clarity, FullStory). Instrumented in Step 2 alongside the walking skeleton. Every recording watched within 48 hours, until 30 sessions observed; after that, watch flagged sessions only (abandoned, replayed audio, anomalous score). Notes logged to `docs/signal/session-notes.md` per recording. Cull check: stopping note-taking kills the channel even if recording continues.

**Channel 3 — In-product feedback prompts.** Shipped with Step 4 (first reality contact). One rotating open-ended question per completed session, freeform text, max 200 chars, optional and skippable. Three questions cycled randomly to prevent fatigue. Responses stored in DB, exported weekly to `docs/signal/in-product-feedback-YYYY-WW.md`. Cull check: response rate below 15% after a month → restructure prompt or relocate it.

**Channel 4 — Async written interviews.** 3 per week from day 14 (ramping from 1/week if recruitment lags). 5-7 Mom Test–framed questions sent via email or Reddit DM, requiring 2-3 sentence answers minimum. Incentive: $20 e-gift card or 3 months free Premium per completed response. Archived to `docs/signal/interviews/YYYY-MM-DD-respondent-id.md`. Cull check: response rate below 20% across 15 invitations → framing or audience is wrong, restructure.

Live synchronous interviews are explicitly excluded from this stack; the four async/observational channels carry the Signal load.

Each weekly review must report: what was observed across all four channels, what changed because of it, and what remains logged but unacted on. Two consecutive weeks where "what changed because of it" is empty means the Signal subsystem is broken regardless of how many notes were taken.

### Cull

Remove what is not working. This is the discipline that makes Ship and Signal possible.

Constituent disciplines:

- **Rule of three:** A pattern must appear in at least three independent signals before it warrants a build response. One complaint is noise. Three complaints from three different users is a pattern.
- **Kill criteria at build time:** Every feature and every discipline gets a kill criterion written before it ships. "If X does not happen by date Y, this gets removed." Written in the feature ledger.
- **Weekly subtraction:** Every week, identify one thing to remove, simplify, or defer. Complexity is debt. The default answer to a new idea is "not yet."
- **Sunk-cost resistance:** Hours spent building something do not count as a reason to keep it. The only question is: does it earn its keep from here forward?

---

## Quality Non-Negotiables

These are not culled. They are the floor beneath the S3 loop.

1. **Rubric fidelity:** Every score and every piece of feedback is grounded in the official Paragon CELPIP Speaking rubric. Generic English feedback is not shipped.
2. **Disclaimer accuracy:** Every score display states clearly: "This is practice feedback only. It is not an official CELPIP score." This text is non-negotiable and may not be weakened.
3. **Data integrity:** User recordings and transcripts are not logged, stored beyond session, or shared without explicit consent.
4. **Auth/payment correctness:** When auth and payments are added (post-beta), no user accesses paid features without a valid session. No charges occur without a confirmed purchase.
5. **Audio reliability:** If transcription fails, the user receives a clear error and can retry. Silent failures are not shipped.

---

## Falsifiability Rule

Any discipline in the S3 loop that has not changed a decision in 14–30 days gets reviewed for culling. If a practice is being followed but not influencing choices, it is ceremony, not discipline. Ceremony gets cut.

Review cadence: weekly reviews (see `docs/reviews/`) are the mechanism for applying this rule.

---

## Daily and Weekly Invocation

**Daily:** Before starting any coding or planning session, read STATUS.md. Confirm WIP ≤ 2. Proceed only if the skeleton is intact.

**Weekly:** Every Monday (or first working day of the week):
1. Write a weekly review in `docs/reviews/YYYY-MM-DD-weekly-review.md`
2. Review the feature ledger (`docs/feature-ledger.md`) — check kill review dates
3. Check the hypotheses file for the current phase (`docs/hypotheses/phase-N-hypotheses.md`) — record what happened against what was predicted
4. Subtract something: one item removed, simplified, or deferred before the week is declared open

---

## Founder-Operator Lens (Layered on The Honest Build)

The Honest Build is the primary operating foundation and governs how work happens. The Founder-Operator Lens is a layer on top that ensures every cycle of work stays anchored to revenue and to the audience the operator genuinely understands. The lens does not replace any Honest Build discipline; it adds three checks that fire at specific trigger points.

### The Three Lens Behaviors

**1. Revenue framing in weekly reviews.** Every weekly review file (`docs/reviews/YYYY-MM-DD-weekly-review.md`) opens with a section titled "What did this week move toward paying users?" requiring a concrete answer. Two consecutive weeks of "nothing yet" answers means the operator is drifting from the revenue anchor and the lens forces a course-correction discussion.

**2. "Which sale does this unblock?" on every feature decision.** When considering shipping a feature, expanding scope, or polishing existing work, the lens forces a specific question: which paying customer (current or near-term) is unblocked or retained because of this work? If the answer is "none specifically, it's just better to have," the feature gets killed or deferred regardless of how appealing it is. This is sharper than the Honest Build's Rule of Three: requests must be tied to willingness to pay, not just expressed interest.

**3. Periodic founder-market-fit check.** At day-30, day-60, and day-90 phase reviews, the operator answers: am I still building for an audience I genuinely understand? Drift signs: designing for users the operator has never been, optimizing for personas the operator has imagined, talking to advisors more than candidates. Naming drift early is the protection.

### The Four Conflict Resolutions

These name in advance how the lens and the foundation resolve where pure Sales-First Operator framing would conflict with the rest of the plan. They are locked decisions and not re-debated except by explicit operator request.

**Resolution 1: Walking skeleton first, not pre-sales.** AI scoring products require a working demo to convey value; candidates will not pay $19/month based on pitch alone. Steps 2-4 of the build protocol (walking skeleton, real Claude scoring, ship to first testers) precede any conversion attempt. Pre-sales-only does not fit this product.

**Resolution 2: Free testers for first 14-day Signal phase, paid from day 15.** Pure Founder Role would require charging from day one; the Honest Build originally targeted day-45 conversion. The compromise: the first cohort of testers (Step 4 onward) gets free access for 14 days while the Signal subsystem captures structural feedback. From day 15, charging starts. New testers from day 15 onward pay from their first session. This is shorter than the original day-45 target — the lens pulled paid conversion forward.

**Resolution 3: Offer iteration runs parallel to product iteration.** Pure Founder Role iterates the offer before the product. For an AI product, the offer cannot be credibly tested without a working demo. So both run in parallel from day 1: pricing tests, positioning copy, and target-audience experiments happen on landing pages, Reddit posts, and ad copy while Steps 2-9 build the product. By day 21 the operator has both a working Task 1 and tested offer copy.

**Resolution 4: Warm network before cold outreach in Signal Channel 4.** The Signal subsystem's Channel 4 (async written interviews, starting day 14) recruits warm contacts first, before going cold on Reddit/Facebook. Warm contacts include people the operator took CELPIP with, fellow Canadian PR applicants known personally, international students from the Red Deer Polytechnic diploma cohort, and any existing Canadian network member who has prepared for or taken CELPIP. Warm leads convert better, give more honest feedback, and signal whether founder-market fit is delivering distribution leverage. Cold recruitment from r/CELPIP and country-specific Facebook groups follows once the warm network is exhausted or starts producing diminishing returns.

### Trigger Points

The lens stays quiet outside three specific moments: end of every weekly review (revenue framing question), every feature or scope decision (which-sale-unblocks question), and day-30/60/90 phase reviews (founder-market-fit check). Outside these triggers, The Honest Build runs the show.

### Falsifiability

The lens is itself falsifiable under the Honest Build's rule. If after 30 days the three lens behaviors have not changed any decision, the lens is not earning its keep and gets culled.

### What the Lens Does Not Do

The lens does not license cutting corners on quality non-negotiables, generate constant revenue anxiety during legitimate building phases, replace any Honest Build discipline, override the dual-surface protocol, or add new disciplines beyond what is already locked in The Honest Build.

---

## Cross-References

- Project instructions: `CLAUDE.md` (summary pointer in the "Operating Foundation" section)
- Current state: `STATUS.md`
- Weekly reviews: `docs/reviews/`
- Phase hypotheses: `docs/hypotheses/`
- Feature kill criteria: `docs/feature-ledger.md`
- Build history: `docs/build-log/`
