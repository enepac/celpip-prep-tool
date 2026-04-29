# Feature Ledger

Every shipped feature is listed here with its kill criteria and kill review date. No feature ships without an entry. This is the enforcement mechanism for the Cull subsystem of The Honest Build (S3).

## How to use this file

1. Before shipping any feature, add a row to the table below.
2. Set the kill criteria at build time — before you know the outcome. "If [X observable condition] has not occurred by [date], this feature is removed."
3. On the kill review date, evaluate the criterion honestly. If it was not met, kill the feature. If it was met, either extend the review date or mark it as retained.
4. Update the Status column whenever the feature's state changes.

## Statuses

- **Active** — shipped and within review window
- **Retained** — met kill criterion; review date extended or feature confirmed permanent
- **Killed** — removed from product
- **Deferred** — not yet shipped; queued

---

## Ledger

| Feature | Ship date | Kill criteria | Kill review date | Status |
|---------|-----------|---------------|-----------------|--------|
| — | — | — | — | — |

---

## Reference

Full S3 operating foundation: `docs/foundation/THE-HONEST-BUILD.md`
