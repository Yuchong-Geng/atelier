# AI4Research Model Sweep

## Purpose

This sweep repeats the multi-turn NeuroGolf-style eval across lower model and effort settings.

The goal is deadline-first evidence for the workshop paper. The sweep asks whether the research-agent protocol remains useful when model capability or reasoning effort decreases.

## Reference Run

The reference full-state run is:

`docs/evals/ai4research-2026-multiturn-neurogolf-fullstate`

That run used the inherited Codex default model at medium effort for baseline, manager, worker, and critic agents.

## Sweep Variants

- `default-low`: inherited Codex default model with low reasoning effort.
- `gpt-5.4-mini-medium`: GPT-5.4-Mini with medium reasoning effort.
- `gpt-5.2-medium`: GPT-5.2 with medium reasoning effort.

## Deadline Harness

For speed, each variant runs two independent condition agents:

- baseline condition
- research-agent full-state condition

The research-agent condition must produce the same canonical artifact classes as the full-state eval:

- `project.yaml`
- `state/current.md`
- `briefs/project.md`
- work packet, report, and resolution
- review packet, report, and resolution
- `briefs/deliverable.md`
- transcript and final plan

This is a deadline sweep, not the final refined harness. The digest should separate artifact quality from autonomous completion and note any protocol deviations.
