---
name: plan_experiment
description: Use when a settled evaluation question should become a bounded experiment work packet.
---

# Plan Experiment

## Purpose

Turn an evaluation question into a scoped experiment work packet.

This skill does not design the whole evaluation frame. Use `design_evaluation.md` first when the metric, task, dataset, or intended read is unclear.

## Read First

- `.atelier/project.yaml`
- `.atelier/briefs/project.md`
- `.atelier/state/current.md`
- `.atelier/resources/index.md`
- relevant claims or evidence if present
- relevant work or review reports if the experiment follows from prior results

## Planning Inputs

Identify the minimum needed to write a bounded `kind: experiment` packet.

- Research question. What does this experiment test or explore?
- Result read. What result pattern would be informative, expected, surprising, or worth carrying forward?
- Method. What method, model, dataset, task, or artifact will be evaluated?
- Metrics. What will be measured?
- Comparisons. What result, baseline, prior run, ablation, or reference point gives the measurement context?
- Execution path. What existing script, command, notebook, config, checkpoint, dataset, or artifact should the worker use?
- Code readiness. Can the experiment run with existing code, or is separate implementation work needed first?
- Outcome mapping. What would support, weaken, refute, qualify, or leave the question inconclusive?
- Expected artifacts. What files, logs, plots, tables, checkpoints, or notes should the worker return?
- Compute kind. Is the work `none`, `cpu`, `gpu`, or `unknown`?
- Approval policy. Can this run autonomously, or does it need manager or human approval?

## Scope Rules

Keep the packet narrow enough for one worker to own.

Prefer one clear question over a bundle of loosely related runs. Split the work if setup, dataset, method, or interpretation differs substantially.

Use `human_run_gate` for expensive, external, destructive, public, or hard-to-stop runs.

Use `human_design_gate` when the experiment requires changing a core method, objective, metric, or claim direction before running.

Do not let an experiment packet authorize broad code changes. If implementation work is needed, create a separate `kind: implementation` packet.

## Packet Output

Create a work packet under `.atelier/work/pending/`.

The packet frontmatter must use:

```yaml
type: work_packet
kind: experiment
status: pending
priority: low | medium | high
effort: low | medium | high
approval_policy: autonomous | manager_review | human_design_gate | human_run_gate
compute_kind: none | cpu | gpu | unknown
owner: unassigned
```

The body should include:

- Objective
- Context
- Scope
- Inputs
- Expected Output
- Success Criteria
- Experiment Frame
- Execution Notes
- Escalation Rules
- Required Report

## Experiment Frame

Include these fields in the packet body.

- Research question
- Result read
- Method or setup
- Metrics
- Comparisons or reference points
- Execution path
- Code readiness
- Outcome mapping
- Expected artifacts
- Claim links if any

## Escalation Rules

Tell the worker to stop or report `needs_context` when:

- the packet does not identify the dataset, artifact, or command path needed to proceed
- the run needs more compute, time, access, or money than expected
- the worker finds a likely bug in core method code
- the worker would need to change the experiment objective, metric, or interpretation
- the output is not interpretable from the planned artifacts

## After Writing

Update `.atelier/work/index.yaml`.

Update `.atelier/state/current.md` only if the experiment changes the active queue or next moves.

Before stopping as manager, run the stage-completion hook in `steer.md`.

Do not launch the experiment unless the user explicitly asked to plan and start it, and the approval policy permits the run.

## Stop Condition

Stop when the experiment packet is specific enough that a worker can claim it, execute or escalate it, and write a report without needing the whole manager conversation.

## Do Not

- Do not reopen the evaluation frame unless the experiment cannot be scoped.
- Do not launch the experiment by default.
- Do not bundle unrelated experiments into one packet.
- Do not authorize broad code edits through an experiment packet.
