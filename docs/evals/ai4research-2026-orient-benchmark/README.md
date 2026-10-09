# AI4Research 2026 Orient Benchmark

## Purpose

This benchmark tests whether research-agent improves early research orientation compared with a freeform model response.

The claim is narrow. The benchmark does not measure final research success, leaderboard performance, or autonomous discovery. It measures whether the workflow captures task constraints, grounds claims, identifies failure modes, and produces recoverable next steps.

## Conditions

`baseline` is a freeform assistant response to the task prompt.

`research_agent` is the same task handled through the research-agent protocol. The response should behave like a manager using orient, evaluation design, experiment planning, evidence, and review concepts where useful.

## Tasks

- Task A: NeuroGolf orientation from a vague competition idea.
- Task B: AI4Research claim extraction from the workshop call and project dogfood evidence.
- Task C: Correctness-evaluation design for a workshop submission.

## Outputs

Each task has two outputs under `runs/`.

Scores are recorded under `scores/`.

The final interpretation is `digest.md`.

## Intended Paper Use

The benchmark supports a workshop-paper claim about correctness and recoverability of early research workflows. It should be reported as a small, manually scored pilot.
