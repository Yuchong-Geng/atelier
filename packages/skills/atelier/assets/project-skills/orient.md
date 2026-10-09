---
name: orient
description: Use after project init, when starting a project, when the project lacks a stable frame, or when related work, evaluation, implementation, review, or user judgment changes the frame.
---

# Orient

## Purpose

Create enough shared project context for `steer.md` to choose useful next moves.

Orient is a recurring manager skill. Use it after init, when the project lacks a stable frame, or when new work changes the frame. Orient produces a provisional frame, asks only blocking user-judgment questions, decides whether records need updating, and hands off to `steer.md` when the frame is clear enough.

## Read First

- `.atelier/project.yaml`
- `.atelier/state/current.md`
- `.atelier/briefs/project.md` if present
- `.atelier/resources/index.md` if present
- `.atelier/logs/decisions.md` if present

## Working Style

Inspect available files, repos, papers, notes, resources, and decisions before asking the user for missing facts. Ask when the answer depends on ambition, risk tolerance, confidential context, taste, or strategic priority.

Draft the manager's best provisional frame first. If two or three plausible frames fit, present them and ask the user to choose or correct them. Before materially updating project records, reflect the provisional frame in chat and ask for explicit write approval.

## Orient Loop

Run this loop when starting or re-centering the project.

1. Inspect available context and state what changed since the last orientation if applicable.
2. Restate the user's idea, goal, constraints, and intended output.
3. Draft a provisional frame good enough for steering.
4. Identify blocking uncertainty, if any.
5. Ask only user-judgment questions that block the frame.
6. Decide whether the frame is ready for steering.
7. If records are stale, pass the Write Approval Gate.
8. After approval, update records.
9. Hand off to `steer.md` after the frame is clear and records are current.

## Frame Elements

Build a compact read specific enough for the user to correct and for `steer.md` to route from durable state.

- Idea or goal. What is the user trying to understand, build, prove, or show?
- Mode. Is the project currently closer to scholar, builder, or another named mode?
- Provisional frame. What is the manager's current best interpretation?
- Key uncertainty. What is most likely to change the frame?
- Steering readiness. Can `steer.md` choose next moves from durable state?
- Record impact. Do project records need updating now, later, or not at all?

## Clarity Gate

Before handoff, the manager should be able to name:

- the object of study
- the provisional contribution or question
- the intended output or audience
- the uncertainty that downstream work should resolve

If any piece is missing, inspect context first. If the missing piece depends on user judgment, ask one to three focused questions and pause. Do not route to related work, evaluation, method work, or experiment planning just to avoid asking.

If the frame is mostly clear and the remaining question is what work should happen next, hand off to `steer.md` instead of asking broad questions inside orient.

## Handoff

Use orient to clarify the project frame, not to choose the full work sequence. An orient cycle ends in one of three states:

1. Frame unclear. Ask targeted clarification questions and pause.
2. Frame clear but records stale. Ask for write approval and pause.
3. Frame clear and records current. Hand off to `steer.md` so the manager can choose the next one to three moves from durable state.

Do not call `steer.md` before material frame updates are written. When asking for write approval, say that `steer.md` will choose the next moves after records are updated.

When orient ends with records current, surface the stage-completion check from `steer.md` instead of stopping at "frame recorded."

## Feedback Loop

Related work, evaluation, method work, implementation, and critic review may send the manager back to orient through `steer.md`. Re-orienting compares old frame to new evidence, names what changed, updates records if needed, and hands back to `steer.md`.

Use scholar or builder mode only to shape the decision bar. For scholar projects, consider quality, clarity, significance, and originality. For builder projects, consider stakeholder value, visible progress, demos, timelines, and final-presentation strength.

## Write Approval Gate

Use this gate after the manager has presented a substantive provisional frame in chat and asked immediate decision-level questions that affect the record.

Material project-record writes require explicit write approval. Ask whether to write the frame, correct it first, or keep discussing. Stop after that ask. Do not infer write approval from agreement with one comparison, content clarification, or a framing answer.

## Write Or Update

After approval, update only files implied by the frame change.

- `.atelier/briefs/project.md`
- `.atelier/resources/index.md`
- `.atelier/state/current.md`
- `.atelier/logs/research-log.md`

Do not create downstream work packets here unless the user explicitly asked for a specific packet.

## Pause Condition

Pause when the manager has a current idea or goal, a provisional frame, explicit open questions or assumptions, and a read on whether to keep orienting, update records, or hand off.

Orient does not finish permanently. Run it again when new evidence or user judgment changes the frame.

## Do Not

- Do not create `deliverable_ready` claims.
- Do not launch experiments.
- Do not delegate broad project understanding to a worker.
- Do not hide uncertainty.
- Do not force deep literature review or evaluation design into orient when a separate skill or work packet is cleaner.
