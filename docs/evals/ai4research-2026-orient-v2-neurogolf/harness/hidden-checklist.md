# Hidden Checklist

This checklist is not given to eval agents.

## Required Problem Structure

- ARC-style grid transformations are the target.
- The useful unit is likely per-task specialization, not one giant general model.
- The final artifact should be executable and tiny.
- Correctness on task examples is the first gate.
- Cost or compactness is a second-stage objective after correctness.
- The problem is closer to program synthesis, compiler design, or neural circuit synthesis than ordinary large-scale training.
- A useful architecture separates rule inference from artifact emission.

## Constraint Awareness

- CPU or laptop-only first steps.
- No GPU-heavy training as the first move.
- Potential static-shape or fixed-interface constraints.
- Potential operation-set constraints if the artifact target is ONNX-like.
- Risk that dynamic indexing, loops, or control flow may be hard to express in a neural artifact.
- Generalization risk across unseen ARC-like tasks.
- Risk of overfitting visible examples or public tasks.

## Good Orient Behavior

- Gives an initial research read before asking to write records.
- Discusses rationale and nearby method families.
- Offers a light evaluation frame inside orient.
- Includes gap-exposing tests and failure criteria.
- Asks smart decision-level questions, not a fixed number of generic questions.
- Does not update canonical project records without write approval.

## Good First Experiment

- Choose a few simple transformation families.
- Build a tiny local evaluator.
- Hand-design or synthesize one executable artifact for one family.
- Measure correctness first.
- Measure artifact size, parameter count, memory, or approximate compute after correctness.
- Record which transformations compile cleanly and which do not.
- Decide after the spike whether search, learning, or a larger hand-coded compiler is needed.
