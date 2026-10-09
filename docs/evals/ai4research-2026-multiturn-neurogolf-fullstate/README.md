# Full-State Multi-Turn NeuroGolf-Style Eval

## Purpose

This reruns the multi-turn NeuroGolf-style eval as a faithful research-agent protocol test.

The earlier multi-turn run simulated manager, worker, and critic behavior inside `docs/evals`. This run requires the research-agent condition to initialize and update a real `.research-agent/` state tree inside an isolated target project.

## Conditions

`baseline` is a freeform multi-turn assistant chat. It receives the same vague prompt and simulated user replies, then writes a transcript and final plan.

`research-agent` is a manager loop over `runs/research-agent/target-project/.research-agent/`. The manager must update canonical project state, create bounded work and review packets, resolve reports, and produce project and deliverable briefs.

## Claim Under Test

The full-state research-agent condition should produce a more recoverable and validity-aware research plan than a freeform baseline because the protocol forces durable state updates, explicit packet boundaries, manager resolutions, and deliverable-facing claim discipline.

The eval still measures workflow quality, not ARC or NeuroGolf task performance.
