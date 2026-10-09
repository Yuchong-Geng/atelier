# AI4Research Full Role-Separated Model Sweep

## Purpose

This sweep reruns the multi-turn NeuroGolf-style evaluation with separate manager, worker, critic, and manager-resolution steps.

The earlier `ai4research-2026-model-sweep` folder used a deadline shortcut where the research-agent condition wrote worker and critic reports in one pass. This folder removes that shortcut.

## Variants

- `default-low`: inherited Codex default model, low reasoning effort.
- `gpt-5.4-mini-medium`: GPT-5.4-Mini, medium reasoning effort.
- `gpt-5.2-medium`: GPT-5.2, medium reasoning effort.
- `reference-default-medium`: imported default-medium full-state reference run.

The reference run source remains in `docs/evals/ai4research-2026-multiturn-neurogolf-fullstate`.

## Expected Research-Agent Flow

For each variant:

1. Manager initializes canonical `.research-agent/` state and creates `W-20260512-001`.
2. Worker reads the packet and writes `report.md`.
3. Manager resolves the worker report and creates `R-20260512-001`.
4. Critic reads the review packet and writes `report.md`.
5. Manager resolves the critic report, updates canonical state, writes a deliverable brief, and writes the final plan.

## Scoring

Use the same 20-point rubric as the prior multi-turn eval.

The digest should compare:

- full role-separated sweep
- deadline shortcut sweep
- default-medium reference run

The result should report artifact quality and operational failures separately.
