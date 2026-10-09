# Hidden Gold Checklist

This checklist is not given to eval agents.

The vague task is based on a NeuroGolf-style problem. A strong orientation should recover most of these items without being told the competition name.

## Required Problem Structure

- ARC-style grid transformations are the target.
- The likely unit of work is per-task specialization, not one giant general model.
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

## Good First Experiment

- Choose a few simple transformation families.
- Build a tiny local evaluator.
- Hand-design or synthesize one executable artifact for one family.
- Measure correctness first.
- Measure artifact size, parameter count, memory, or approximate compute after correctness.
- Record which transformations compile cleanly and which do not.
- Decide after the spike whether search, learning, or a larger hand-coded compiler is needed.

## Expected Research-Agent Advantages

- Asks clarifying questions before committing.
- Creates a project frame and assumptions.
- Delegates bounded investigation or critique.
- Uses critic findings to revise the plan.
- Produces recoverable artifacts, not only prose.
- Avoids claiming it has solved ARC or NeuroGolf.
