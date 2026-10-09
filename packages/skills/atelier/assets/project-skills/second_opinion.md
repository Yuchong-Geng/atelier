---
name: second_opinion
description: Use when a claim, evidence record, experiment design, implementation report, paper section, steering choice, or deliverable needs bounded critique from a fresh critic.
---

# Second Opinion

## Purpose

Create a bounded review packet for a fresh critic.

Second opinion is review-only. The critic does not fix issues, update canonical state, or act as co-manager. The manager resolves the review report later with `resolve_report.md`.

## Read First

- `.atelier/project.yaml`
- `.atelier/state/current.md`
- target artifact or path
- relevant claims, evidence, work reports, review reports, briefs, code paths, artifacts, or paper sections needed to frame the review

## Review Choice

Choose the smallest useful review.

- `standard` checks correctness, completeness, scope, and readiness for the stated target.
- `adversarial` challenges the approach, assumptions, tradeoffs, evidence, and failure modes. It is not just a stricter standard review.

A different platform is preferred when available, but same-platform review is valid when only one platform is available.

## Review Types

Use one review type.

- `claim`
- `evidence`
- `experiment_design`
- `math`
- `code`
- `paper`
- `deliverable_plan`
- `steering`

## Research Attack Surface

For adversarial review, ask the critic to focus on material risks such as:

- claim scope exceeding evidence
- weak or missing evidence
- evaluation not matching the claim
- implementation behavior not matching the stated method
- data, benchmark, or artifact ambiguity
- result pattern not supporting the intended story
- fragile assumptions in math, code, or interpretation
- misleading deliverable framing
- expensive or low-value next steps

## Packet Output

Create a review packet under `.atelier/reviews/pending/`.

Use this frontmatter.

```yaml
---
type: review_packet
id: R-YYYYMMDD-001
title: Short review title
status: pending
review_type: claim | evidence | experiment_design | math | code | paper | deliverable_plan | steering
review_mode: standard | adversarial
target: artifact-id-or-path
effort: low | medium | high
blocking: false
owner: unassigned
created: YYYY-MM-DD
updated: YYYY-MM-DD
---
```

The body should include:

- Review Objective
- Target
- Context
- Questions To Answer
- Required Report

## Context Rules

Give the critic enough context to review the target, but keep the packet bounded.

Anything outside the packet is out of scope unless the packet explicitly permits limited extra inspection.

For cross-platform review, prefer fresh bounded context over copied chat history.

## Required Report

Tell the critic to write `report.md` and stop.

The report should:

- preserve observed facts, inferences, open questions, and recommendations separately
- report only material findings
- ground findings in the provided context
- include severity and confidence for each finding when useful
- avoid style-only feedback unless the target is writing or presentation

## Trigger Defaults

Consider second opinion for:

- deliverable-ready claims
- evidence that contradicts an active claim
- blocking experiment designs
- core implementation reports
- major steering pivots
- paper-facing or presentation-facing strong claims

Routine plotting, status updates, exploratory scratch results, and non-blocking summaries usually do not need second opinion.

## After Writing

Update `.atelier/reviews/index.yaml`.

Update `.atelier/state/current.md` only if the review blocks a near-term decision or deliverable.

Before stopping as manager, run the stage-completion hook in `steer.md`.

Do not launch the review unless the user asked to start it and the adapter can do so safely.

## Stop Condition

Stop when the review packet is specific enough that a critic can review it, write `report.md`, and stop without needing the whole manager conversation.

## Do Not

- Do not ask the critic to fix issues.
- Do not let the critic update canonical state.
- Do not turn second opinion into open-ended brainstorming.
- Do not request broad context unless the target cannot be reviewed otherwise.
