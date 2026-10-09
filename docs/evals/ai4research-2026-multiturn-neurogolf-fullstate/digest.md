# Digest

## Result

| Condition | Score | Severe errors |
| --- | ---: | --- |
| Baseline | 16 / 20 | none |
| Research-agent full-state | 20 / 20 | none |

The full-state rerun strengthens the earlier multi-turn result. The baseline produced a strong freeform plan, but the research-agent condition produced the canonical artifacts that the system design claims to provide.

## What Changed From The Earlier Multi-Turn Run

The earlier run simulated the manager-worker-critic loop inside an eval folder. This run initialized a real `.research-agent/` state tree inside an isolated target project.

The full-state condition produced:

- a project configuration
- a project brief
- a current-state snapshot
- a work packet, worker report, and manager resolution
- a review packet, critic report, and manager resolution
- a deliverable brief
- a transcript and final plan

This makes the eval more faithful to the actual system claim. Research-agent is not only a prompt style. It is a file-backed manager protocol.

## Main Qualitative Difference

The baseline plan starts with a practical CPU benchmark using color remapping, object translation, and reflection. It defines artifact folders, a `predict(grid)` interface, exact-match scoring, artifact size, fitting time, and inference time.

The full-state research-agent plan pushes further on validity. It records that implementation should begin with the benchmark specification and artifact runner, not solver models. The final state requires a frozen runtime manifest, canonical artifact serialization, DSL tiers, generator holdout splits, and matched controls for hybrid templates.

The critic pass changed the plan. The final deliverable brief no longer presents the first worker proposal as ready. It presents a corrected experiment contract.

## Paper-Facing Interpretation

This case study supports a workflow-layer claim:

> A file-backed manager-worker-critic protocol can turn a vague research idea into a more auditable and falsifiable next-step experiment than a freeform chat response.

The case study does not support claims that the system solves ARC, solves NeuroGolf, guarantees correctness, or improves final scientific outcomes.

## Operational Caveat

Two manager subagents stalled. The harness continued from `.research-agent/` state. This is a limitation for autonomy, but it also demonstrates the value of durable state. The run remained recoverable because the manager had already written canonical state and a work packet.

Future model sweeps should record exact model IDs, set explicit model and reasoning-effort overrides, and score both artifact quality and autonomous completion.
