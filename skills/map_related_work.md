---
name: map_related_work
description: Use when the project needs a clearer map of prior work, baselines, datasets, implementations, public reviews, or field expectations before framing claims or experiments.
---

# Map Related Work

## Purpose

Build a decision-useful map of the research landscape.

Do not collect papers for their own sake. Identify what prior work implies for the project's problem frame, baselines, evaluation design, assumptions, and next moves.

## Read First

- `.atelier/project.yaml`
- `.atelier/briefs/project.md`
- `.atelier/resources/index.md`
- `.atelier/state/current.md`
- relevant work packet if assigned as a worker

## Working Style

Start from project context, seed papers, repos, datasets, and user-provided references.

Search outward only as needed. Prefer a compact, grounded map over a broad bibliography.

Do not ask the user for papers the manager can find. Ask the user when choosing field boundaries, target venues, practical constraints, or which line of work matters most.

## Source Availability Check

Before searching broadly, inspect `resources/index.md`.

If available sources are unclear, ask what source surfaces the manager may use for this project. Examples include papers, repos, datasets, benchmark suites, internal docs, code search, prior experiments, dashboards, and team baselines.

## Search Surfaces

Choose sources based on the project. Do not search every surface by default.

For scholar projects, useful surfaces may include:

- arXiv
- OpenReview
- Semantic Scholar
- Google Scholar
- NeurIPS, ICML, ICLR, ACL, CVPR, and PMLR proceedings
- ACM Digital Library or IEEE Xplore
- Papers with Code
- GitHub, Hugging Face models, and Hugging Face datasets

For builder projects, useful surfaces may include:

- project repos
- GitHub repos and issues
- internal code search when available
- internal docs, design docs, experiment logs, dashboards, and evaluation reports
- team-owned baselines, tools, datasets, and prior prototypes
- issue trackers or task systems when they reflect real constraints

## Citation Integrity

Do not invent citations, venues, years, author lists, claims, or URLs.

When a citation matters, verify it through an accessible source before recording it. If a paper or resource cannot be verified, mark it as unverified rather than treating it as part of the landscape.

## Mapping Loop

1. Extract seed topics, methods, tasks, datasets, and baselines.
2. Find closely related papers, implementations, datasets, benchmarks, and surveys.
3. Group resources by role in the project.
4. Identify accepted baselines and evaluation norms.
5. Identify recurring limitations, pain points, or reviewer concerns.
6. Record durable links and short relevance notes.
7. Propose follow-up work packets only for gaps that need deeper reading.

## Resource Roles

Use plain labels in `resources/index.md`.

- Seed work
- Direct baseline
- Adjacent method
- Dataset or benchmark
- Prior implementation
- Survey or tutorial
- Review discussion
- Internal or project-specific resource
- Candidate to inspect later

## Review-Mining Pass

For scholar projects, inspect public peer-review discussions when available and relevant.

Extract:

- recurring reviewer concerns
- baseline expectations
- missing ablations or evaluations
- contribution-scope objections
- unclear claims or framing issues
- opportunities for gap-exposing evaluation

Do not treat reviewer comments as ground truth. Treat them as evidence about field expectations.

## Write Or Report

If acting as manager, update:

- `.atelier/resources/index.md`
- `.atelier/briefs/project.md` when the landscape changes the project frame
- `.atelier/state/current.md` when the map changes next moves
- `.atelier/logs/research-log.md`

Before stopping as manager, run the stage-completion hook in `steer.md`. State what the landscape changes, what next stage it implies, and any user-level decision needed.

If acting as worker, write `report.md` and stop. The manager decides what becomes canonical.

## Stop Condition

Stop when the manager can answer:

- which prior work matters most
- what fair baselines look like
- what datasets or implementations are available
- what reviewers or practitioners may question
- what landscape gaps need deeper investigation

## Do Not

- Do not cite papers that were not inspected.
- Do not overstate a paper from title or abstract alone.
- Do not turn related work into claims.
- Do not update canonical state when acting as a worker.
