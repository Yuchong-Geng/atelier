---
name: develop_method
description: Use when a proposed method, model, artifact, metric, dataset path, or evaluation tool needs to become working implementation.
---

# Develop Method

## Purpose

Turn a research method or artifact idea into scoped implementation work.

This skill is the research-protocol wrapper for implementation. It decides what should be built, where implementation belongs in the research loop, and what packet should be created. Use Superpowers-style software engineering workflows when available for the actual implementation discipline.

## Read First

- `.atelier/project.yaml`
- `.atelier/briefs/project.md`
- `.atelier/state/current.md`
- `.atelier/resources/index.md`
- relevant claims, evidence, work reports, or review reports if present
- relevant code repos or paper repos listed in `resources/index.md`

## Development Frame

Clarify the implementation target.

- Purpose. What research idea, method, metric, dataset path, or artifact needs implementation?
- Role. Is it core method logic, evaluation logic, glue code, config, data processing, plotting, infrastructure, or paper-facing artifact generation?
- Existing surface. What repo, module, script, config, notebook, checkpoint, dataset, or artifact already exists?
- Intended behavior. What should the implementation do?
- Inputs and outputs. What should enter and leave the implementation?
- Scope. Which files, modules, or directories are in scope?
- Verification. How will the worker know the implementation works?
- Downstream use. Which experiment, evaluation, claim, or deliverable will use it?

## Approval Policy

Use `human_design_gate` when implementation affects core method logic, objectives, metrics, claim direction, data semantics, or paper-facing interpretation.

Use `manager_review` for ordinary evaluation code, config changes, glue code, plotting, or non-core scripts.

Use `autonomous` only for small, low-consequence implementation with clear inputs, outputs, and tests.

Use `human_run_gate` if implementation work will launch expensive, external, destructive, or public actions.

## Scope Rules

Keep related implementation edits in one packet when they serve the same method or artifact and can be reviewed together.

Split packets when objectives, ownership, approval policy, verification, or downstream use differ.

A packet may include small supporting changes such as configs, logging, helper scripts, smoke tests, or local bug fixes when they are needed to complete the same implementation target.

Do not use one packet for a broad repo cleanup, multi-method refactor, or unrelated evaluation suite.

## Superpowers Use

When Superpowers is available, use it for nontrivial implementation design, debugging, TDD, review, or verification.

Do not duplicate Superpowers inside this skill. This skill should define the research scope, approval gate, packet, and success criteria.

## Packet Output

Create a `kind: implementation` work packet under `.atelier/work/pending/`.

The packet should specify:

- implementation purpose
- allowed files or directories
- forbidden files or boundaries
- inputs and outputs
- expected behavior
- verification command or check
- downstream experiment or deliverable
- approval policy
- required report

## Required Report

Tell the worker to write `report.md` and stop.

The report should include:

- what changed
- files touched
- verification run
- behavior or scope deviations
- blockers or concerns
- suggested follow-up
- whether the implementation is ready for experiment planning

The manager reads the report, writes `resolution.md`, and then updates canonical state or creates follow-up work.

## Escalation Rules

Tell the worker to stop or report `needs_context` when:

- the implementation target is underspecified
- the worker would need to change core method semantics beyond the packet
- expected inputs, outputs, or verification are unclear
- the needed change spans more files or modules than scoped
- the worker discovers a design problem that should be discussed with the manager or user

## After Writing

Update `.atelier/work/index.yaml`.

Update `.atelier/state/current.md` only if the implementation work changes the active queue or next moves.

Before stopping as manager, run the stage-completion hook in `steer.md`.

Do not implement directly unless the user explicitly asked for direct implementation and the approval policy permits it.

## Stop Condition

Stop when the implementation packet is specific enough that a worker can claim it, make the scoped change, verify it, and report back without needing the whole manager conversation.

## Do Not

- Do not turn implementation planning into experiment planning.
- Do not authorize broad repo edits.
- Do not let implementation workers update claims, evidence, or briefs.
- Do not bypass `human_design_gate` for core method changes.
