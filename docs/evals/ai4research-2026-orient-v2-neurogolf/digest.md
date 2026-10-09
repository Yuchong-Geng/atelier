# Digest

## Question

Does the updated `orient.md` produce a more informative and useful first research orientation than a freeform baseline on the same vague NeuroGolf-style multi-turn prompt?

## Result

Yes. The current-orient condition outscored the freeform baseline in the preliminary run and in the four-variant sweep.

| Setting | Baseline | Current Orient | Delta |
| --- | ---: | ---: | ---: |
| preliminary current | 16 / 20 | 20 / 20 | +4 |
| reference default medium | 18 / 20 | 20 / 20 | +2 |
| default low | 17 / 20 | 20 / 20 | +3 |
| GPT-5.4-Mini medium | 15 / 20 | 19 / 20 | +4 |
| GPT-5.2 medium | 15 / 20 | 19 / 20 | +4 |

Sweep mean baseline score: 16.25 / 20.

Sweep mean current-orient score: 19.5 / 20.

Sweep mean improvement: +3.25 / 20.

No severe content errors were recorded.

The baselines were often competent. They usually recovered task-local executable artifacts, CPU constraints, and a plausible first experiment.

The current-orient condition added value in the areas targeted by the patch. It gave a substantive initial read before the write gate, offered a cluster-level or remembered landscape, discussed rationale, separated correctness from compactness, proposed gap-exposing tests, named failure criteria, and asked for write approval only after the provisional frame was developed.

## What Improved

The strongest differences were:

- landscape and nearby-method framing
- explicit failure criteria before implementation
- symbolic baseline and artifact-boundary pressure
- clearer benchmark direction
- write-gate discipline

The research-agent traces did not update `.research-agent/` records after init because the simulated user never granted write approval.

## Interpretation

This supports a narrow claim:

> Across a small multi-turn model sweep on a vague research-orientation prompt, the updated orient protocol produced more complete and recoverable provisional research frames than freeform baselines, improving manual rubric scores by 2 to 4 points out of 20.

It does not show that research-agent improves final research outcomes, solves ARC-style tasks, or improves model capability. It is a regression test for the orient prompt and approval-gate behavior.

## Limitations

The evaluation has one prompt family and a small number of model settings. Scoring was manual and not blind. The research-agent traces used remembered or candidate landscape rather than inspected source logs. Future runs should preserve source-use traces if source grounding becomes part of the claim.
