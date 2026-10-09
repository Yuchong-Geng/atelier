Yes, there is probably a research direction here, but I would frame it carefully. NeuroGolf sounds less like a normal “train a model to solve ARC” competition and more like a constrained neural program synthesis problem: for each ARC-style task, produce the smallest static ONNX network that gets the transformation right while paying for parameters, memory, and MACs.

The key detail is that submissions are one ONNX file per task, with static shapes and a tight file-size limit. That makes per-task specialization likely more important than building one large general model. The research question becomes: given a few input/output examples from an ARC task, can you infer a compact computation graph that implements the rule?

I would start with a deliberately simple baseline, not a big training setup.

First, read the official rules and make a local checklist of the exact ONNX constraints: allowed ops, disallowed ops, shape requirements, file-size accounting, and how cost is computed. Those details will decide almost everything.

Second, build a tiny end-to-end pipeline for a handful of easy ARC transformations. Pick tasks like color remapping, cropping, translation, symmetry, object counting, and simple pattern completion. For each one, manually or semi-automatically generate an ONNX network, run it locally, and measure file size, parameter count, memory, and MACs. The goal is not leaderboard performance yet. The goal is to understand what “small” means in practice.

Third, separate the problem into two layers:

- rule inference: determine what transformation the examples imply
- circuit emission: compile that inferred rule into a valid small ONNX graph

The second layer may be the easier place to get traction first. If you can hand-code a few transformation families and reliably emit compact ONNX, you will quickly learn which operations are cheap, which patterns are awkward, and what the cost model rewards.

The most promising research angles I see are:

- Neural circuit synthesis for ARC-like transformations.
- Hybrid symbolic-neural solvers where symbolic search proposes a rule and ONNX acts as the executable target.
- Cost-aware architecture search under static graph constraints.
- A library of tiny differentiable primitives for grid manipulation.
- Minimum-description-length style scoring, where the best explanation is the smallest working network.

I would not begin by training a generic neural net on ARC-GEN-100K. That might become useful later for rule proposal or task classification, but the submission format seems to reward compact per-task mechanisms. A large model could help outside the submitted artifact, but the submitted artifact itself has to be a small static ONNX file.

The first concrete thing I would do is implement a “toy NeuroGolf workbench”:

1. Choose 10 easy ARC-style tasks.
2. Write a local evaluator for fixed input/output grids.
3. Generate valid ONNX networks for simple transformations.
4. Record correctness, file size, parameters, memory, and MACs.
5. Make a table of which transformation families compile cleanly and cheaply.

After that, you can decide whether the hard part is rule discovery or ONNX compression. My guess is that the best early progress comes from building a compiler for a small DSL of grid operations, then adding search over that DSL. The ONNX networks would be the compiled artifacts, not the primary object you reason about by hand.

So my recommendation is: treat NeuroGolf as ARC program synthesis with a neural-network packaging constraint. Start with a tiny compiler and measurement loop before investing in learning-based methods.
