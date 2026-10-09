# Smallest Credible Correctness Eval

## Claim Being Tested

The bounded claim is that research-agent improves correctness and recoverability in early research orientation compared with a freeform assistant response.

Correctness means the output preserves source facts, separates assumptions from evidence, identifies what would verify or falsify a direction, and avoids paper-facing claims that exceed the available evidence. Recoverability means a future researcher can resume the work from the output without reconstructing the task state from chat.

The eval should not claim improved research outcomes, autonomous discovery, or better benchmark performance. The project is too new for outcome-level claims. The paper-facing claim should stay at the workflow layer.

## Evaluation Unit

One unit is a single model answer to a bounded early-research prompt with frozen source context.

Each answer is scored against a gold checklist and an error taxonomy. The scorer should not reward polish by itself. The scorer should reward structure only when the structure makes correctness, falsification, or resumption easier.

## Task Set

Use three tasks. The small size is acceptable because the paper claim is a pilot claim, not a general benchmark claim.

1. NeuroGolf orientation.
   The answer must recover the competition goal, hard constraints, verification path, and first no-GPU actions from limited source context.

2. AI4Research claim extraction.
   The answer must extract honest workshop-paper claims from the workshop facts and current dogfood evidence without overstating project maturity.

3. Correctness-evaluation design.
   The answer must design the smallest credible no-GPU eval and specify claim, conditions, rubric, correctness checks, failure criteria, artifacts, and paper interpretation.

The three tasks cover orientation, claim discipline, and evaluation design. They are enough for a same-day workshop pilot because all three are correctness-sensitive and can be judged from text, source snippets, and existing project evidence.

## Conditions

Run two conditions on the same frozen prompts.

`baseline` receives the user prompt and source context, then answers naturally as a helpful model.

`research_agent` receives the same prompt and source context, then answers as a research-agent manager. The manager should separate facts, assumptions, evaluation criteria, failure modes, and bounded next actions. The manager may use research-agent concepts, but the final answer must remain useful as a standalone artifact.

The minimal run is six outputs, with three tasks times two conditions. If time permits, repeat the six-output run once in a second model family. Treat the second model family as a replication check rather than the main result.

Keep the run single-turn for both conditions. Do not allow extra browsing during the run. Any source facts needed by both conditions must appear in the frozen task prompt or source file.

## Scoring Rubric

Score each output from 0 to 2 on eight dimensions.

1. Objective capture.
   The output identifies the actual research or evaluation goal.

2. Constraint capture.
   The output captures no-GPU constraints, new-project status, ordinary subscriptions, few-hour reproducibility, and workshop limits.

3. Source grounding.
   The output separates source-backed facts from assumptions and avoids invented workshop, competition, or project details.

4. Evaluation quality.
   The output defines what would support, weaken, refute, or qualify the proposed direction.

5. Failure-mode awareness.
   The output identifies ways the result could mislead, including confounded scoring, unblinded judging, overclaiming, and protocol overhead.

6. Next-step specificity.
   The output gives bounded actions that a researcher can perform today.

7. Recoverability.
   The output leaves enough state for another researcher or agent to resume without hidden chat context.

8. Workshop fit.
   The output connects the work to accessibility, reproducibility, and correctness without inflating the claim.

The maximum score is 16 per output. Report the total score and the per-dimension score.

## Correctness Checks

Freeze a gold checklist before scoring.

Each task should have required facts, forbidden claims, expected assumptions, expected failure modes, and expected next actions. Required facts should be traceable to the prompt or source context. Forbidden claims should include claims that the current project has proven real research productivity, broad generalization, or outcome-level improvement.

Mark severe correctness errors separately from the 0 to 2 rubric. A severe error is a false source claim, an unsupported paper-facing claim, a recommendation that violates the no-GPU or few-hour constraint, or an evaluation design that cannot distinguish raw answer quality from manager acceptance and recovery quality.

Use masked scoring. Rename files before scoring so the scorer sees task ID and output ID, not condition name. After scoring, unmask conditions and compute mean score by condition, severe-error count by condition, and dimension-level differences.

Run an adjudication pass on any output with a severe error or any task where condition scores differ by at least four points. The adjudication pass should cite the exact source fact or rubric item behind the decision.

## Failure Criteria

The research-agent claim fails if the research-agent condition does not improve average score over baseline, or if the research-agent condition has equal or higher severe-error count.

The claim is only partially supported if the research-agent condition improves recoverability but not source grounding or evaluation quality. That outcome supports a weaker claim about resumption, not a correctness claim.

The eval itself fails if the scorer cannot reproduce the score from frozen prompts, source context, outputs, rubric, and scoring notes within a few hours.

The paper claim must be downgraded if the research-agent answer wins mainly by being longer, by adding generic process language, or by making claims that are not tied to the source context.

## Expected Artifacts

The same-day artifact set should include the frozen prompts, source context, baseline outputs, research-agent outputs, score table, scoring notes, severe-error log, and digest.

The score table should include task ID, condition, dimension scores, total score, severe-error count, scorer notes, and any adjudication note.

The digest should report the claim under test, the result, the main error categories, the cost in researcher time, and the paper-facing interpretation.

## Result Read

A green result means research-agent improves mean score by at least three points out of 16 and reduces severe correctness errors.

A yellow result means research-agent improves recoverability or failure-mode awareness but does not clearly improve source grounding or evaluation quality.

A red result means research-agent adds structure without better correctness, produces more severe errors, or makes the run too slow to reproduce in a few hours.

## Paper-Facing Interpretation

If the result is green, the workshop paper can claim that a file-backed manager protocol improved correctness-oriented early research orientation in a small manual pilot. The paper should define correctness as source grounding, constraint capture, falsification clarity, and claim discipline.

If the result is yellow, the paper should claim that research-agent improved recoverability and evaluation framing, while correctness effects remain unproven.

If the result is red, the paper should report the pilot as a negative result that identifies where protocol structure fails to improve correctness. That outcome would still fit the workshop if the paper explains the failure cleanly and proposes the next bounded correction.

In every outcome, the submission should state that the eval is a pilot. The eval supports a claim about workflow correctness checks, not a claim about better scientific discoveries.
