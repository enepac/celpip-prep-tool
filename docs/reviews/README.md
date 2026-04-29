# Weekly Reviews

One file per week. Written every Monday (or first working day of the week) before any other work begins.

## Filename format

```
YYYY-MM-DD-weekly-review.md
```

Use the Monday date of the review week.

## File structure

Each weekly review has four sections, matching the S3 loop:

```markdown
# Weekly Review — YYYY-MM-DD

## Shipped this week
- List everything that moved to a shippable state (feature, fix, experiment)
- Include build step numbers where applicable

## Signal collected
- List every user interaction, interview, observation, or data point
- Note the source (interview / direct observation / telemetry / other)
- Mark which signals confirmed a hypothesis and which falsified one

## Culled
- List everything removed, simplified, or deferred this week
- Include the kill reason for each item

## Next week's bets
For each planned item, write the falsification criterion in advance:
- "I expect [X] to happen by [date]. If it does not, I will [kill/pivot/continue investigating]."
```

## Why this format

The falsification criterion in "Next week's bets" is the mechanism for applying the Falsifiability Rule from THE-HONEST-BUILD.md: any discipline not changing decisions in 14–30 days gets reviewed for culling. Writing the bet before the week starts makes it impossible to retroactively claim the outcome was expected.

## Reference

Full S3 operating foundation: `docs/foundation/THE-HONEST-BUILD.md`
