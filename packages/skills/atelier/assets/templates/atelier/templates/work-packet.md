---
type: work_packet
id: W-YYYYMMDD-001
title: Short work title
status: pending
kind: analysis
priority: medium
effort: medium
approval_policy: manager_review
owner: unassigned
compute_kind: unknown
created: YYYY-MM-DD
updated: YYYY-MM-DD
---

# W-YYYYMMDD-001: Short Work Title

## Objective

State the bounded task.

## Context

List the context the worker should read.

## Scope

Define what is in scope and what is out of scope.

## Inputs

List files, artifacts, commands, datasets, papers, prompts, or prior results the worker should use.

## Expected Output

Describe the output the worker should produce.

## Success Criteria

Describe how the worker and manager can tell whether the task succeeded.

## Experiment Frame

Use this section when `kind: experiment`.

- Research question:
- Result read:
- Method or setup:
- Metrics:
- Comparisons or reference points:
- Execution path:
- Code readiness:
- Outcome mapping:
- Expected artifacts:
- Claim links:

## Edit Scope

Default edit scope is `none`.

Allowed paths:

- none

Core method changes require separate work with explicit manager approval.

## Execution Notes

Record command hints, environment notes, compute kind, artifact paths, or operational constraints.

Detailed host names, GPU IDs, job IDs, launched commands, logs, live artifact paths, ETA, retry counts, cost notes, quota notes, and sync notes belong in `progress.md` when needed.

## Escalation Rules

State when the worker should stop and report `needs_context`, `blocked`, `failed`, or `completed_with_concerns`.

## Required Report

The worker must write `report.md` and stop. The report should include Summary, Scope Check, Work Performed, Findings, Artifacts And Pointers, Validity And Limitations, and Suggested Follow-Up.
