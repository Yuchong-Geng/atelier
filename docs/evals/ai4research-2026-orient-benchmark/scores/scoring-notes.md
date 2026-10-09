# Scoring Notes

Scores are assigned manually from `rubric.md`.

The scorer should penalize unsupported certainty, missing constraints, and vague next steps. The scorer should not reward research-agent structure unless the structure makes the output more correct, recoverable, or actionable.

## Task A: NeuroGolf Orientation

Baseline total: 10/16.

The baseline captured the basic objective and several hard constraints. It gave useful first actions around official-rule checking and a toy ONNX workbench. It lost points for source grounding because it did not mark the Kaggle rules as unavailable in the packet and did not separate provisional facts from assumptions. Its evaluation frame was mostly a workbench plan rather than explicit support, weaken, refute, or qualify criteria. It did not connect the output to workshop fit.

Research-agent total: 14/16.

The research-agent output captured the same objective and constraints but made assumptions explicit, separated source limits from project bets, defined validity and cost evaluation stages, and listed concrete risks around static shapes, allowed operations, private validation, and cost-vs-correctness. It left a more recoverable project frame and bounded next moves. It also did not connect the task to workshop fit, because the task prompt did not include the workshop context.

## Task B: AI4Research Claim Extraction

Baseline total: 12/16.

The baseline was careful and avoided overclaiming. It identified safe claims and unsupported claims, including that the dogfood was not a real-topic validation. It lost points for constraint capture and next-step specificity because the output did not turn needed evidence into bounded eval artifacts, and recoverability was mostly prose rather than state that another agent could resume from.

Research-agent total: 16/16.

The research-agent output cleanly separated supported, weak, and unsupported claims. It mapped each claim to evidence limits, named needed evidence, and translated risks into paper-safe wording. This is the strongest result for the protocol because the task directly tests claim discipline.

## Task C: Correctness Evaluation Design

Baseline total: 16/16.

The baseline produced a strong six-task correctness audit with answer keys, scoring, failure criteria, CPU-only checks, and paper-facing interpretation. It was already workshop-aligned and did not overclaim.

Research-agent total: 16/16.

The research-agent output produced a more compact eval matched to this benchmark, with three tasks, two conditions, severe-error tracking, masked scoring, failure criteria, expected artifacts, and green/yellow/red result reads. It was not meaningfully better than baseline on the rubric, but it was more directly aligned with the actual pilot we can run today.

## Aggregate Read

Baseline mean: 12.67/16.

Research-agent mean: 15.33/16.

Research-agent improvement: +2.67 points on average.

The gain comes from orientation under uncertainty and claim discipline. The explicit eval-design task was strong in both conditions.

No severe correctness errors were observed in the six outputs. The main baseline weakness was missing source uncertainty and less recoverable state, not hallucination.
