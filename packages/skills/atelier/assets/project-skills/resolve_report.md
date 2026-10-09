---
name: resolve_report
description: Use when a work or review item has submitted report.md and needs manager resolution before canonical state changes.
---

# Resolve Report

## Purpose

Turn a worker or critic report into a manager decision.

Reports are proposed outputs. Resolutions are the manager's accepted interpretation. Do not edit submitted reports. Record agreement, disagreement, limits, and follow-up in `resolution.md`.

When a report materially changes project direction, use the resolution as the start of a post-report briefing. The worker studies first. The manager then brings the accepted read, implications, recommended next move, and user-level decisions back to the user.

## Read First

- `.atelier/project.yaml`
- `.atelier/state/current.md`
- the item's `packet.md`
- the item's `report.md`
- linked progress, claims, evidence, briefs, resources, artifacts, or code paths needed to judge the report

## Resolution Loop

1. Check whether the report answered the packet.
2. Separate observed facts, worker or critic interpretation, and manager interpretation.
3. Decide what is accepted, partially accepted, rejected, invalid, or superseded.
4. Decide whether the report is material for the project route.
5. Identify canonical updates, if any.
6. Identify follow-up work, reviews, evidence, claim, deliverable, or state updates.
7. Write `resolution.md`.
8. Move the item to `closed/`.
9. Update the relevant queue index.
10. Surface the post-report briefing when the report is material.

## Decision Labels

Use one decision.

- `accepted`
- `partially_accepted`
- `rejected`
- `invalid`
- `superseded`

## Work Report Resolution

For work reports, decide whether the output changes evidence, claims, current state, project brief, next work, next review, or deliverable readiness.

For experiment reports, preserve the experiment read when useful. A failed run is not negative evidence unless the failure itself is the result being studied.

```text
supports | weakens | refutes | qualifies | inconclusive | not_applicable
```

## Review Report Resolution

For review reports, resolve findings individually when the report includes finding IDs.

For each material finding, record `accepted`, `partially_accepted`, or `rejected`.

Do not let a critic update canonical state directly. The manager decides what changes.

## Materiality Check

A report is material when accepting or rejecting it changes:

- project frame, problem, contribution, audience, or output
- related-work position, comparable systems, or baseline pressure
- evaluation target, success criteria, falsification criteria, or acceptance bar
- method, implementation, prototype, or analysis direction
- central risks, blockers, cost, data, or compute path
- claims, evidence, deliverable direction, or ordered next moves

Routine execution reports, small status updates, and reports that only confirm recorded assumptions do not need a full post-report briefing. They still need a resolution and a clear next move.

## Post-Report Briefing

Use a post-report briefing after resolving a material related work, evaluation, method, implementation, experiment, evidence, or review report.

Bring:

- accepted read
- implication for the project
- canonical updates made or deferred
- recommended next move
- user-level decision needed, if any

When the next move is clear, name the skill or packet instead of waiting for the user to name it. If the move changes strategy, scope, budget, method direction, claim scope, or deliverable focus, ask the user to approve or choose.

If discussion makes the frame stale, unclear, or contradicted, record the issue and route through `steer.md` to `orient.md`.

## Resolution Output

Write `resolution.md` using the shared template.

Include:

- Decision
- Manager Read
- Accepted
- Not Accepted Or Limited
- Canonical Updates
- Post-Report Briefing, when the report is material
- Follow-Up

Work resolutions may add `Claim And Evidence Impact`.

Review resolutions may add `Finding Decisions`.

## Canonical Updates

After writing `resolution.md`, update only files implied by the decision. Common updates include:

- `.atelier/state/current.md`
- `.atelier/briefs/project.md`
- `.atelier/evidence/`
- `.atelier/claims/`
- `.atelier/work/index.yaml`
- `.atelier/reviews/index.yaml`
- `.atelier/logs/research-log.md`

Use `logs/decisions.md` only for larger project-level decisions, not routine per-item resolution.

When an accepted work result should become durable evidence, use `evaluate_evidence.md` after writing `resolution.md`.

If the post-report briefing changes the accepted read, route through `steer.md` before further canonical updates. Discussion can sharpen the manager read, but unresolved discussion is not evidence.

## Follow-Up

Always surface the manager's recommended next step after resolving a report.

Treat the report's Suggested Follow-Up as input, not an instruction.

For material reports, do not stop at "report resolved." State what the result implies, what was or should be recorded, and what the manager recommends next.

If the user asked for autonomous research, the manager may create follow-up packets when the next action is concrete, scoped, and within policy.

If the user asked for status, review, or update only, surface recommended next steps instead of silently expanding the queue.

If the next step requires strategy, priority, budget, compute, core-method changes, or deliverable direction, record it under Follow-Up and surface it before creating new work.

Follow-up may include new work, review, evidence, claim, evaluation, method, or deliverable work.

## Stop Condition

Stop when:

- `resolution.md` exists
- the item is moved or marked closed
- the queue index is updated
- canonical updates are made or explicitly deferred
- concrete follow-up is created or noted

## Do Not

- Do not edit submitted `report.md`.
- Do not treat worker or critic interpretation as canonical without manager resolution.
- Do not create evidence from failed or invalid work unless the failure itself is the finding.
- Do not update `logs/decisions.md` for routine per-item decisions.
