# Scoring Notes

## Summary

The full-state rerun preserves the earlier qualitative result but makes the research-agent condition more faithful to the system design. The baseline produced a competent freeform research plan. The research-agent condition produced canonical project state, bounded packets, manager resolutions, a critic resolution, and a deliverable brief.

The main difference is no longer only prose quality. The full-state condition leaves a recoverable `.research-agent/` tree that records what was accepted, what was rejected or limited, what changed after critique, and what a future manager should do next.

## Baseline

Score: 16 out of 20.

The baseline correctly recovered the task-local executable-artifact framing, CPU constraint, learning-versus-synthesis framing, benchmark path, and same-day implementation direction.

Evaluation design receives 1 point. The baseline defines held-out tests, artifact folders, exact-match scoring, artifact bytes, fitting time, and inference time. It does not define a frozen runtime manifest, canonical artifact serialization, generator holdouts, DSL tiers, or matched hybrid attribution controls.

Critique and revision receives 1 point. The baseline uses the simulated user replies to narrow the plan, but it does not run an adversarial review or resolve concrete validity objections.

Recoverability receives 1 point. The baseline writes a transcript and final plan, but a future agent would need to reconstruct state, decisions, and validity risks from prose.

Workshop usefulness receives 1 point because the baseline is useful for ideation but weaker as evidence for a file-backed correctness workflow.

No severe error is recorded.

## Research-Agent Full-State

Score: 20 out of 20.

The research-agent condition earns full credit because it updates the actual state layer expected by the protocol:

- `project.yaml`
- `state/current.md`
- `briefs/project.md`
- `work/active/W-20260512-001/packet.md`
- `work/active/W-20260512-001/report.md`
- `work/active/W-20260512-001/resolution.md`
- `reviews/active/R-20260512-001/packet.md`
- `reviews/active/R-20260512-001/report.md`
- `reviews/active/R-20260512-001/resolution.md`
- `briefs/deliverable.md`

The worker report identified the artifact boundary as the core validity risk. The manager partially accepted the report and created a blocking critic packet. The critic then found seven issues covering hidden runtime intelligence, generator-template leakage, DSL oracle effects, weak neural baselines, serialization ambiguity, hybrid attribution, and benchmark rules. The manager accepted all findings and revised the project brief, current state, and deliverable brief.

Recoverability receives full credit because a future agent can resume from canonical state rather than reading chat history.

No severe error is recorded.

## Operational Limitation

Two spawned manager agents stalled during the run. The harness continued from durable state and recorded that caveat in `run-metadata.md`. This does not change the artifact-quality score, but it should be reported if the case study is used in a paper.
