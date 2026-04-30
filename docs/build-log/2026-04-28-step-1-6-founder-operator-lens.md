---
step: 1.6
slug: founder-operator-lens
date: 2026-04-28
s3_tag: Ship
type: foundation-infrastructure
---

# Step 1.6 — Founder-Operator Lens Added to Foundation

## What was built

The Founder-Operator Lens was added as an explicit layer on top of The Honest Build operating foundation. This is a documentation-only step (no code changes). Two files were updated.

## Files changed

- `docs/foundation/THE-HONEST-BUILD.md` — new section `## Founder-Operator Lens (Layered on The Honest Build)` appended before the Cross-References section. Grew from 101 to 138 lines.
- `CLAUDE.md` — new paragraph added to the Operating Foundation section, between the Falsifiability rule and the canonical-file pointer line.

## What the lens is

The Founder-Operator Lens is **not** a replacement for The Honest Build. It is a layer that adds three specific behaviors firing at three specific trigger points:

1. Revenue framing question in every weekly review
2. "Which sale does this unblock?" on every feature/scope decision
3. Founder-market-fit drift check at day-30/60/90 phase reviews

Outside those three trigger points, The Honest Build runs the show unmodified.

## The four conflict resolutions

Four resolutions were written explicitly because they are the likely flashpoints between a Sales-First Operator framing and the rest of the plan:

- **Resolution 1:** Walking skeleton precedes pre-sales (AI products need a working demo)
- **Resolution 2:** Free testers for first 14-day Signal phase, then paid from day 15 (pulled forward from original day-45 target)
- **Resolution 3:** Offer iteration runs parallel to product iteration, not before
- **Resolution 4:** Warm network before cold outreach in Signal Channel 4

These are locked decisions, not re-debated except by explicit operator request.

## Decisions made

- The lens is itself subject to the Honest Build's falsifiability rule: if none of the three behaviors has changed a decision after 30 days, the lens gets culled. This was explicit in the design.
- The four conflict resolutions were documented in full because ambiguity at those junctions would cause thrash. Writing them down removes the need to re-derive the answer mid-cycle.

## Verification performed

```
wc -l docs/foundation/THE-HONEST-BUILD.md
→ 138

grep -c "Founder-Operator Lens" docs/foundation/THE-HONEST-BUILD.md CLAUDE.md
→ docs/foundation/THE-HONEST-BUILD.md: 2
→ CLAUDE.md: 1

grep -c "Resolution 4" docs/foundation/THE-HONEST-BUILD.md
→ 1

git diff (both files) — only the intended sections changed, no other modifications
```

## Deferrals

None. This was a documentation sync step with no deferred items.

## Next step

Step 2: Basic UI shell (task picker, prompt display). Pre-work check: verify Next.js skeleton from Step 1 is intact (`npm run build` passes, dev server starts).
