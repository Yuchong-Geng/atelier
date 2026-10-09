# NeuroGolf Orientation

The available source context makes NeuroGolf look less like a standard model-training competition and more like a constrained solver-compilation problem. The artifact is an ONNX file for each ARC task. The file must have static tensor and parameter shapes, fit within 1.44 MB, avoid some operations, and score on both correctness and cost.

The research direction should be framed around a small compiler from task hypotheses to cheap neural artifacts. The first question is not whether a neural network can learn ARC in general. The first question is whether a per-task solver can infer a transformation rule from examples, express the rule inside the permitted ONNX subset, and stay cheap under parameters, memory, and multiply-accumulate operations.

## Project Frame

Treat each task as a local synthesis problem. The manager loop should infer a candidate rule from the task examples, choose a representation that can be encoded with static ONNX shapes, and emit one small model for the task. A successful project would combine symbolic rule search outside the submitted artifact with neural or tensorized execution inside the submitted artifact.

The research bet is that ARC transformations often have compact structure. Object motion, color remapping, cropping, reflection, repetition, counting, and mask-based edits can be much cheaper than a general-purpose learned network when the solver is specialized per task. NeuroGolf appears to reward that compactness because correctness is scored together with file size and compute cost.

I would not start by training a generic ARC model. Generic training may still help as a proposer or critic outside the submitted ONNX files, but the submission constraint points toward compiled per-task mechanisms. The training problem can wait until a simple compile-and-measure path exists.

## Assumptions

- The official Kaggle rules are not available in the eval packet, so every rule detail beyond the supplied summary remains provisional.
- Each task can receive at most one ONNX file, so the submitted model should be specialized to the inferred transformation for that task.
- Static shape requirements probably favor a fixed grid representation with padding or a fixed maximum canvas.
- Disallowed ONNX operations may remove convenient control-flow or indexing patterns.
- Cost includes parameters, memory footprint, and multiply-accumulate operations, so zero-parameter tensor programs may be strong if the allowed operation set permits them.
- Validation includes ARC-AGI, ARC-GEN-100K, and private benchmark tasks, so a method that only memorizes known public tasks is too narrow.

## Risks

The largest technical risk is the gap between a human-readable ARC rule and an allowed ONNX graph. A rule may be easy to state but expensive or impossible to encode if the operation list forbids dynamic indexing, loops, conditional control, or shape-dependent behavior.

Static shapes create a second risk. ARC tasks vary in grid size, and a padded fixed-size representation may waste memory and compute. The cost formula will decide whether fixed maximum grids are acceptable or whether the compiler needs task-specific shape specialization.

There is also a boundary risk around what Kaggle accepts as a small neural network. ONNX can encode deterministic tensor programs. The provided source context says submissions are ONNX files, but the exact competition wording may restrict patterns that look too symbolic or too hand-coded. The project should check the official rules before committing to a pure compiler strategy.

Private benchmark tasks create a generalization risk. A hand-built library of narrow templates may solve visible examples and fail on held-out transformations. The first system should still use broad transformation families rather than one-off task IDs.

Finally, cost optimization can obscure correctness. The project should make functional correctness the first gate and only compare cost among solutions that pass the task examples and any local validation split.

## Evaluation Frame

Use a two-stage evaluation. Stage one is functional validity. Stage two is cost among functionally valid artifacts.

For each attempted task, track whether the generated ONNX file runs, whether the graph uses only the permitted operation subset once the official list is known, whether input and output shapes match the task contract, and whether outputs match all examples. Record file size, parameter count, estimated activation memory, and multiply-accumulate operations if a local scorer or profiler is available.

The local benchmark should include small slices from ARC-AGI and ARC-GEN-100K because the source context names both. Keep a separate development slice and holdout slice. The holdout slice should be selected before tuning templates so that template growth does not silently become memorization.

A useful first metric is solved tasks per transformation family. A second useful metric is median cost among solved tasks. The project should avoid a single aggregate score early because a low-cost artifact that solves trivial tasks can hide the absence of coverage on harder transformations.

## Bounded Next Moves

First, verify the official competition contract when the Kaggle page or rules packet is available. The exact ONNX input format, output format, allowed operation list, static shape requirements, scoring formula, and packaging rules will determine the compiler design.

Second, build a small task taxonomy before coding a full system. Label a small sample of ARC-AGI and ARC-GEN-100K tasks by transformation family, required objects, grid-size behavior, color behavior, and whether a static tensor graph seems plausible.

Third, choose five easy task families for a manual spike. Good candidates are color maps, constant fills, crop or pad rules, reflection, and translation of a detected mask. For each family, write down the rule, the required tensor operations, and the likely cost drivers before implementing anything.

Fourth, create one minimal ONNX prototype after the official rule details are known. The prototype should solve one family end to end, pass static-shape validation, and report file size plus compute cost. The goal is to test the compiler path, not to maximize leaderboard score.

Fifth, decide whether the next iteration needs search, learning, or only a larger hand-coded library. If manual rules compile cleanly and cost stays low, expand the compiler. If rule inference becomes the bottleneck, add an external proposer that suggests candidate rules but still compiles the final answer into a small ONNX artifact.

The immediate first action is a one-family compile-and-measure spike after rule verification. Without that spike, the project may spend too much effort on model ideas that cannot fit the ONNX, size, shape, or cost constraints.
