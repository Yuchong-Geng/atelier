# Smallest Credible Correctness Eval

I would make the eval a small, controlled correctness audit rather than a user study or a benchmark. The goal is not to prove broad productivity gains. The goal is to show that, on real research-material tasks, the system can find correctness problems, avoid false alarms, and produce evidence that another researcher can check in a few hours.

The smallest credible version is six tasks, two conditions, and a prewritten answer key.

## Core Claim

The claim should be narrow:

> A lightweight AI-assisted research workflow improves correctness checking on small research artifacts compared with an ordinary single-agent answer, using only CPU-local checks and ordinary Codex or Claude subscriptions.

That claim is small enough to test today. It also lines up with the workshop criteria because it emphasizes accessibility, reproducibility, and correctness rather than scale.

## Task Set

Use six short tasks from one real research topic or one real project. Avoid toy puzzles. Each task should fit in one prompt with frozen source context and should be answerable in 15 to 25 minutes.

A good six-task mix would be:

1. Equation check: given a short derivation and a claimed identity, decide whether the derivation is valid.
2. Code-to-equation check: given a small function and a mathematical formula, decide whether the implementation matches the formula.
3. Experiment-claim check: given a results table and a draft claim, decide whether the claim is supported.
4. Reproducibility check: given a method paragraph and config snippet, identify whether enough information is present to rerun the experiment.
5. Negative control: provide a correct artifact and ask the model to check it. This measures false positives.
6. Ambiguous or under-specified case: provide an artifact where the correct answer is "not enough information." This measures calibration.

At least two tasks should contain real or naturally occurring issues if possible. If that is not feasible today, use carefully seeded issues, but disclose that they were seeded. The seeded issues should be realistic research mistakes, such as a swapped sign, a missing normalization factor, a mismatch between a table and a written claim, or a config value that contradicts the method text.

## Conditions

Use two conditions.

Condition A is the ordinary baseline. Give the task to one model in a normal prompt and ask for a final answer with evidence.

Condition B is the correctness-checking workflow. Use one model to produce an initial answer, then use the other model to critique that answer against the same frozen evidence, then ask for a final answer that resolves the critique.

Keep the prompts fixed across tasks. Do not tune prompts after seeing results. If possible, alternate which model goes first in Condition B so the result is not only measuring one model's initial-answer quality.

With six tasks, this gives twelve final answers to score. That is small enough to run in a day and still large enough to show patterns.

## Answer Key

Write the answer key before running the models. For each task, the key should include:

- The correct verdict.
- The exact evidence supporting the verdict.
- Any acceptable alternative answer.
- The minimum facts required for full credit.
- A note on what would count as a hallucinated or unsupported answer.

For code or math tasks, include a deterministic CPU check when possible. This can be a tiny unit test, a numerical counterexample, or a symbolic simplification. The eval should not require GPU training, external APIs, paid annotators, or large datasets.

## Scoring

Use a 10-point rubric per task:

- 3 points for the correct final verdict.
- 2 points for locating the relevant equation, code line, table entry, or assumption.
- 2 points for explaining the reasoning accurately.
- 1 point for giving an appropriate verification step, counterexample, or reproducibility check.
- 1 point for calibration, meaning the answer does not overclaim when evidence is missing.
- 1 point for concision and usability by a researcher.

Also track critical failures separately:

- False positive on a correct artifact.
- False negative on an artifact with a real issue.
- Unsupported claim about having run an experiment.
- Fabricated source detail.
- Recommendation that would require GPU budget despite the constraint.

The headline metric can be mean score, but the more important table is the critical-failure count by condition. Since the sample is small, do not claim statistical significance. Report exact task-level outcomes.

## Correctness Checks

The eval needs independent correctness checks, not just model preference judgments.

For math tasks, correctness should be checked by a human-written derivation, a small numerical example, or both.

For code tasks, correctness should be checked by a CPU unit test or by comparing outputs against a simple reference implementation.

For claim-checking tasks, correctness should be checked against the frozen table, excerpt, or config. The model should only get credit for claims grounded in that evidence.

For reproducibility tasks, correctness should be checked against a checklist of required information, such as data source, split, seed, metric definition, command, model version, and hardware assumption.

Score blind if possible. The scorer should not know whether an answer came from Condition A or Condition B until after scores are assigned.

## Failure Criteria

Define up front what would make the eval fail to support the submission claim.

The eval should be treated as negative or inconclusive if:

- The correctness-checking workflow does not reduce critical failures.
- The workflow improves explanations but not verdict accuracy.
- The workflow creates more false positives on negative controls.
- The answers cannot be reproduced from the frozen task context.
- The answer key requires hidden expert knowledge that is not available to scorers.

This is useful even if the result is negative. A negative result can still support a workshop submission if the paper honestly reports what failed and how the eval exposed it.

## Expected Artifacts

The final submission package should include:

- Six frozen task prompts.
- The answer key.
- Raw transcripts for each condition.
- A score sheet with per-task rubric scores.
- Any CPU-only verification snippets or command outputs.
- A short analysis with task-level results.
- A one-page reproducibility note explaining how another researcher can rerun the eval.

Those artifacts are enough for a reviewer to inspect the correctness claims directly.

## Day-One Schedule

Morning:

Choose the real topic, write six tasks, and write the answer key before running any agents.

Midday:

Run Condition A and Condition B on all six tasks. Save raw transcripts without editing them.

Afternoon:

Score answers blind, run any CPU checks, and make a compact results table.

Evening:

Write the workshop-facing interpretation. Keep the claim narrow. Say this is a small correctness audit, not a general benchmark.

## Paper-Facing Interpretation

If the workflow reduces critical failures, frame the result like this:

> In a six-task CPU-only correctness audit, the workflow reduced critical correctness failures relative to ordinary single-agent use while remaining reproducible with ordinary research resources.

If the result is mixed, frame it honestly:

> The eval identified which correctness tasks benefited from cross-checking and which did not. The main contribution is a reproducible, low-cost correctness audit for early-stage AI research workflows.

That framing is credible for AI4Research because it does not overclaim. It shows an accessible eval, reproducible artifacts, and explicit correctness verification.
