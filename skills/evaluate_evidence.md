---
name: evaluate_evidence
description: Use when accepted work, results, artifacts, literature, analysis, or human judgment should become a durable evidence record.
---

# Evaluate Evidence

## Purpose

Turn an accepted result or artifact into a readable evidence record.

Evidence is the manager's accepted read of a concrete source. It is not raw output, a worker report, or a claim.

Use `resolve_report.md` first when a submitted report has not yet been resolved.

## Read First

- `.atelier/project.yaml`
- `.atelier/state/current.md`
- `.atelier/briefs/project.md`
- relevant `resolution.md`
- relevant `report.md`
- source artifacts, plots, logs, tables, papers, code paths, or notes needed to understand the result
- linked claims if present

## Evidence Read

Decide what the source shows.

- Source. What concrete report, artifact, result, paper, analysis, or judgment is being read?
- Result read. What does the manager accept from the source?
- Evidence kind. Is it experiment, analysis, literature, math, code, or human judgment?
- Strength. Is the evidence strong, moderate, weak, or inconclusive?
- Claim impact. Does it support, weaken, refute, qualify, or not yet connect to a claim?
- Deliverable use. Can it support a paper, report, demo, presentation, or decision?
- Limitations. What should a future manager remember when using this evidence?

## Evidence Output

Create or update an evidence file under `.atelier/evidence/`.

Use this frontmatter.

```yaml
---
type: evidence
id: E001
title: Short evidence title
status: active | historical | superseded | invalid
evidence_kind: experiment | analysis | literature | math | code | human_judgment
strength: strong | moderate | weak | inconclusive
deliverable_use: yes | no | maybe
claim_links: []
source_work: W-YYYYMMDD-001
source_report: work/closed/2026-05/W-YYYYMMDD-001/report.md
source_resolution: work/closed/2026-05/W-YYYYMMDD-001/resolution.md
source_artifacts: []
created: YYYY-MM-DD
updated: YYYY-MM-DD
---
```

The body should include:

- Result Read
- Source
- Claim Impact
- Strength
- Limitations
- Deliverable Use
- Follow-Up

## Existing Evidence

Update an existing evidence record when a new source refines the same result read.

Create a new evidence record when the new source answers a different question, changes the interpretation, or needs separate claim links.

Mark old evidence `historical`, `superseded`, or `invalid` instead of deleting it.

## Claim Links

If the evidence affects an active claim, add the claim link.

Do not revise the claim in this skill unless the claim edit is mechanical. Use `update_claim.md` when the claim wording, support level, scope, or deliverable readiness needs judgment.

## Follow-Up

Record useful follow-up in the evidence body.

Create follow-up packets only when the next action is concrete and fits the user's current operating intent.

Before stopping as manager, run the stage-completion hook in `steer.md`.

## Stop Condition

Stop when:

- the evidence record exists or is updated
- evidence strength and deliverable use are labeled
- source pointers are durable
- claim impact is recorded or explicitly absent
- follow-up is recorded or created

## Do Not

- Do not treat unresolved reports as evidence.
- Do not copy raw artifacts into the evidence file.
- Do not turn evidence into a higher-level claim.
- Do not delete superseded evidence.
