---
name: update_claim
description: Use when evidence, reviews, project framing, or deliverable needs require creating, revising, narrowing, superseding, or retiring a claim.
---

# Update Claim

## Purpose

Update the claim layer from accepted evidence and manager judgment.

Claims are higher-level interpretations. Evidence records say what a source shows. Claims say what the project currently believes, argues, or intends to use.

Use `evaluate_evidence.md` first when a result has not yet become durable evidence.

## Read First

- `.atelier/project.yaml`
- `.atelier/state/current.md`
- `.atelier/briefs/project.md`
- relevant claim files
- relevant evidence records
- relevant review reports or resolutions if present

## Claim Read

Decide what claim action is needed.

- Create. A new project interpretation needs a lightweight claim.
- Revise. Existing claim wording, scope, rationale, or evidence links need updating.
- Narrow. Evidence supports a smaller claim than the current wording.
- Broaden. Evidence and framing support a wider claim.
- Supersede. A newer method, framing, or result replaces the old claim.
- Refute. Evidence makes the claim no longer tenable.
- Retire. The claim is historical and no longer guides the project.

## Claim Output

Create or update a claim file under `.atelier/claims/`.

Use this frontmatter.

```yaml
---
type: claim
id: C001
title: Short claim title
status: draft | active | deliverable_ready | historical | superseded | refuted
claim_kind: method | result | theory | evaluation | positioning | implementation
support_level: unsupported | weak | moderate | strong | mixed | refuted
evidence_links: []
created: YYYY-MM-DD
updated: YYYY-MM-DD
---
```

The body should include:

- Claim
- Scope
- Rationale
- Evidence
- Limitations
- Deliverable Readiness
- Review State
- Next Revision

Update `.atelier/claims/index.yaml` when a claim is created, retired, superseded, refuted, or materially changed.

## Support Level

Set `support_level` from the current evidence mix.

- `unsupported`. The claim is an idea or intended direction.
- `weak`. Evidence exists but is preliminary, narrow, or indirect.
- `moderate`. Evidence supports the claim with some remaining limits.
- `strong`. Evidence supports the claim well enough for the intended use.
- `mixed`. Evidence points in different directions.
- `refuted`. Evidence contradicts the claim.

## Status

Set `status` separately from support level.

- `draft`. Useful idea, not yet an active project claim.
- `active`. Current project claim under development.
- `deliverable_ready`. Ready to use in a paper, report, demo, presentation, or decision.
- `historical`. Preserved for record, no longer active.
- `superseded`. Replaced by a newer claim or direction.
- `refuted`. No longer tenable.

## Review Need

Consider a review packet when:

- the claim is moving to `deliverable_ready`
- evidence is mixed
- a claim is central to project direction
- the claim depends on math, implementation behavior, or fragile evaluation interpretation
- the claim will appear in a paper, report, presentation, or important decision

Use `second_opinion.md` for a bounded critic pass when useful.

## Follow-Up

Record next claim work in `Next Revision`.

Create follow-up work or review packets only when the next action is concrete and fits the user's current operating intent.

Before stopping as manager, run the stage-completion hook in `steer.md`.

## Stop Condition

Stop when:

- the claim file is created or updated
- support level and status are current
- linked evidence records match the claim's current support, limits, and scope
- limitations and next revision are recorded
- review need is recorded or intentionally deferred

## Do Not

- Do not revise claims from unresolved reports.
- Do not treat raw artifacts as evidence.
- Do not hide superseded or refuted claims.
- Do not mark a claim `deliverable_ready` without linked evidence.
