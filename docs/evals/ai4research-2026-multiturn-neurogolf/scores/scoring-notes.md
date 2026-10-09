# Scoring Notes

## Summary

The baseline produced a strong research plan. It recovered the task-local executable-artifact framing, honored the CPU constraint, and proposed a same-day synthetic benchmark. Its main weakness was validity control. The final plan did not fully specify the artifact boundary, baseline matching, hidden shortcut checks, or a recoverable manager state.

The research-agent condition produced a stronger eval protocol after the worker and critic handoffs. The worker broadened the method space. The manager narrowed the worker proposal to a CPU-sized first experiment. The critic then found validity problems in the narrowed plan, and the manager revised the final contract around a frozen runtime, matched feature table, matched baselines, and hidden slices.

## Baseline

Score: 16 out of 20.

The baseline earns full credit for hidden structure recovery, constraint capture, method framing, bounded next steps, use of interaction, and claim discipline. It clearly frames the project as task-local executable compression for ARC-style transformations and avoids claiming ARC performance.

Evaluation design receives 1 point. The baseline defines task families, baselines, metrics, and decision criteria, but the plan leaves key validity controls underspecified. It does not freeze the runtime boundary, match DSL and hybrid representations, or stratify hidden examples against shortcuts.

Critique and revision receives 1 point. The baseline updates its plan after simulated user replies and includes pivot criteria, but it does not include an independent critic pass or a recorded resolution of specific objections.

Recoverability receives 1 point. The final plan is readable and actionable, but it is mostly prose. A future agent would still need to reconstruct the artifact contract, state packets, and validity assumptions.

Workshop usefulness receives 1 point. The output is useful for research ideation, but it is weaker as evidence for workflow correctness because it lacks explicit decomposition and review artifacts.

No severe error is recorded. The baseline used the `NeuroGolf` label even though the starting prompt did not name the competition. The run treats this as a source-framing risk, not an official-rule claim, because the plan presents a possible constrained benchmark rather than claiming compliance with external rules.

## Research-Agent

Score: 20 out of 20.

The research-agent condition earns full credit on all dimensions. It recovers the hidden per-task executable-artifact structure, preserves the CPU and compactness constraints, frames the method as rule inference plus artifact emission, and produces a same-day experiment.

The main gain appears in the middle of the trace. The manager first accepted a worker proposal, then narrowed the scope from 40 to 60 tasks to 10 generated tasks. The critic then identified artifact-boundary, baseline-matching, and hidden-slice risks. The manager accepted those objections and rewrote the first experiment around a frozen runtime and matched conditions.

Recoverability receives full credit because the condition leaves a transcript, worker packet, worker report, critic packet, critic report, and final plan. A future agent can resume from the artifact runtime and schema before implementing solver search.

No severe error is recorded.
