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

Constituent disciplines:

- **3 interviews/week from day 1:** Talk to potential or actual users at least three times per week starting from the first day of beta. Not surveys — conversations. Recorded or carefully noted.
- **Direct observation:** Watch users use the product. Not asked what they think — watched what they do. Confusion is signal. Delight is signal. Abandonment is signal.
- **Weekly falsifiable reviews:** Every week, write down what you expected to happen and what actually happened. If your hypotheses were not falsifiable in advance, they were not hypotheses.
- **Telemetry:** Instrument the core loop (task start, recording completion, score received, score page time-on-page) from day one of beta. No telemetry = no signal.

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

## Cross-References

- Project instructions: `CLAUDE.md` (summary pointer in the "Operating Foundation" section)
- Current state: `STATUS.md`
- Weekly reviews: `docs/reviews/`
- Phase hypotheses: `docs/hypotheses/`
- Feature kill criteria: `docs/feature-ledger.md`
- Build history: `docs/build-log/`
