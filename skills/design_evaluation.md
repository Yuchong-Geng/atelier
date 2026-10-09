---
name: design_evaluation
description: Use when the project needs an evaluation frame before planning experiments, claiming progress, comparing methods, or preparing a research deliverable.
---

# Design Evaluation

## Purpose

Design an evaluation frame that can tell the project what it is learning.

Do not start from available metrics alone. Start from the research goal, expected claim, or decision the evaluation must illuminate.

## Read First

- `.atelier/project.yaml`
- `.atelier/briefs/project.md`
- `.atelier/resources/index.md`
- `.atelier/state/current.md`
- relevant claims or evidence if present
- relevant work packet if assigned as a worker

## Working Style

Do the context work before asking for decisions. Inspect existing project context, related-work notes, datasets, code artifacts, and prior experiments before asking the user or manager.

Ask the user or manager when the answer depends on strategic value, target audience, risk tolerance, available data, or what kind of result would matter.

## Evaluation Frame

Build a provisional evaluation frame around these questions.

- What claim, question, or project goal does the evaluation need to illuminate?
- What standard evaluations would the field or audience expect?
- What gap-exposing evaluations could reveal limitations of existing approaches and strengths of the proposed direction?
- What datasets, tasks, artifacts, or human judgments are available?
- What outcomes would support, weaken, refute, or qualify the direction?
- What evaluation risks or ambiguities could make the result hard to interpret?

## Deliverable Fit

Ask how the evaluation would appear in the final deliverable.

- What table, figure, qualitative example, demo, proof sketch, or case study would make the result understandable?
- Would the evaluation support the intended paper, report, presentation, or demo?
- Would the audience see why the result matters without extra private context?
- What result pattern would be compelling?

## Output

If acting as manager, update:

- `.atelier/briefs/project.md`
- `.atelier/state/current.md`
- `.atelier/logs/research-log.md`

Before stopping as manager, run the stage-completion hook in `steer.md`. State what the evaluation frame changes, what next stage it implies, and any user-level decision needed.

If acting as worker, write `report.md` and stop. The manager decides what becomes canonical.

The output should leave behind:

- standard evaluations to consider
- gap-exposing evaluations to consider
- available datasets, tasks, artifacts, or judgments
- support, weaken, refute, and qualify conditions
- risks that could make evaluation hard to interpret
- deliverable-fit notes

## Stop Condition

Stop when the manager can explain:

- what the evaluation is meant to learn
- which standard evaluations are expected
- which gap-exposing evaluations matter
- what outcomes would change the project direction
- what deliverable shape the evaluation could support

## Do Not

- Do not launch experiments.
- Do not create experiment work packets by default.
- Do not update canonical state when acting as a worker.
