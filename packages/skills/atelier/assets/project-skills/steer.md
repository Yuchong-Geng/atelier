---
name: steer
description: Use when the user asks what next, asks for project status, returns after time away, or when a substantive manager stage has changed durable state and needs next moves.
---

# Steer

## Purpose

Recover durable state, resolve reported work, maintain ordered next moves, and recommend one to three actions.

## Read First

- `.atelier/project.yaml`
- `.atelier/state/current.md`
- `.atelier/work/index.yaml` and `.atelier/reviews/index.yaml`
- `.atelier/briefs/project.md`
- active or reported work and review packets
- relevant claims and evidence
- `.atelier/logs/research-log.md` and `.atelier/logs/decisions.md`

## Steering Loop

1. Read current focus and queue state.
2. Resolve reported work or reviews with `resolve_report.md`; do not route past an unresolved report.
3. Brief the user when a resolved report is material.
4. Use `evaluate_evidence.md` and `update_claim.md` when accepted results affect evidence or claims.
5. Identify blockers, stale work, pending work, and decisions.
6. Re-orient if the frame is stale, unclear, or contradicted.
7. Apply the next-move prerequisites.
8. Recommend the next one to three moves.

## Operating Intent

Match the user's current request.

For status or update requests, surface state and recommended next moves. Do not silently expand the queue.

For autonomous research or continued progress, create follow-up packets only when the next action is concrete, scoped, and within policy.

If the next move changes strategy, priority, budget, compute, core method, or deliverable direction, surface it as a user decision.

## Stage Completion Hook

Run this lightweight check before ending a manager response that completed a substantive stage, wrote or revised a durable artifact, changed the active read, created a packet, or resolved a report. Do not wait for the user to ask what comes next.

State:

- what changed
- whether `state/current.md` and `Next Moves` are current
- the recommended next one to three moves
- any user-level decision needed

If the route is clear and the user's current operating intent allows progress, propose or create the next bounded artifact or packet. If the next move changes strategy, priority, budget, compute, core method, or deliverable direction, surface the decision before acting.

## Post-Report Briefing

Use a post-report briefing when a material report has just been resolved or when user discussion changes the manager's active read. State what came back, what it means, what changed, what the manager recommends next, and what user-level decision is needed.

If the report is still unresolved, say that resolving it and recording or deferring canonical updates comes before downstream packets.

Do not make the user name the next skill when the route is clear. If related work makes evaluation next, recommend `design_evaluation.md`. If evaluation clarifies the target, recommend `develop_method.md` or `plan_experiment.md`. If method work changes the frame, route to `orient.md`.

After discussion, decide what should become durable. Update or offer to update `state/current.md` when the active read, risks, blockers, queue snapshot, or ordered next moves changed. Use the relevant skill when discussion changes evidence, claims, deliverable, or frame.

If the discussion is exploratory and does not settle a manager read, do not create file churn. Capture only accepted decisions, stable risks, and next moves.

## Reorientation Trigger

Use `orient.md` when durable state is no longer enough to choose next moves.

Re-orient when reports, reviews, evidence, blockers, user judgment, or manager review changes or contradicts:

- the problem or object of study
- the provisional contribution or question
- the intended output or audience
- central assumptions or constraints
- the evaluation target or success criteria
- the active strategic priority

Do not reorient for routine progress when the frame remains stable.

## Next-Move Prerequisites

Treat `Next Moves` as the manager's working agenda. Refresh it after material report resolutions, accepted post-report discussion, and completed prerequisite steps.

Prefer this dependency order when the relevant piece is missing or has changed:

1. Frame. Use `orient.md` when the project frame is unclear, stale, or contradicted.
2. Landscape. Use `map_related_work.md` or a bounded landscape packet when prior work, comparable systems, users, constraints, tools, or integrations are not clear enough.
3. Evaluation. Use `design_evaluation.md` when success, failure, falsification, acceptance, or useful evidence is not clear enough.
4. Method Or Design. Use `develop_method.md` when the mechanism, system, workflow, model, or intervention needs scoped work.
5. Execution Plan. Use `plan_experiment.md` or an implementation packet when the experiment, prototype, implementation, or analysis is ready to plan.
6. Evidence Review. Use `evaluate_evidence.md`, `update_claim.md`, or `resolve_report.md` when results or reports need acceptance.
7. Deliverable. Use `bridge_deliverable.md` when evidence should support a paper, report, demo, memo, or artifact.

The order is a routing aid, not a rigid phase chain. Skip pieces that are clear enough. If landscape or evaluation changes the frame, reorient first. If it only clarifies baselines, expectations, or success criteria, continue.

Mode changes the interpretation. In scholar mode, landscape means related work, citations, baselines, datasets, implementations, and field expectations. In builder mode, it means users, workflows, constraints, integrations, tools, and comparable systems. Evaluation means reviewer-facing tests in scholar mode and acceptance, demo, failure, or operational evidence in builder mode.

## Manager Advice

The manager may recommend adjustments when durable state or manager judgment suggests a better path. Ground advice in evidence, blockers, reports, reviews, resources, goals, or explicit reasoning. Advice may revise method, implementation, evaluation, experiments, claims, second opinions, or deliverable direction.

If advice changes strategy, priority, budget, compute, core method, or deliverable direction, surface it before creating new work.

## What To Surface

Keep the response concise. Include current focus, material completed or reported work, blockers, evidence or claim changes, recommended next moves, and user decisions needed. Do not summarize every queue item. Link to files when useful.

## Current State Update

Update `.atelier/state/current.md` when steering changes active read, queue snapshot, blockers, risks, or ordered next moves.

When chat-only discussion changes rationale, risks, next moves, claim scope, evaluation, method, or deliverable direction, offer to record the accepted update. If policy allows and the user clearly accepted the read, write it instead of leaving it only in chat.

Use `logs/research-log.md` for a short chronological note when meaningful work was resolved or the project direction changed.

Use `logs/decisions.md` only for larger project-level decisions.

## Stop Condition

Stop when the manager can answer what changed, what matters now, what is blocked, what the next one to three moves are, and what the user needs to decide.

## Do Not

- Do not create new packets merely to look busy.
- Do not reopen settled design unless new evidence or blockers require it.
- Do not treat active work as failed just because it has not reported yet.
- Do not update claims or evidence without using the relevant skill.
