# Scoring Notes

This eval uses the same vague NeuroGolf-style multi-turn prompt as the prior multi-turn research-agent evals, but narrows the measurement to the updated orient behavior.

Scores are manual and not blind to condition labels.

## Score Summary

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

## Baseline Pattern

The baselines are generally strong. They usually recover the core direction as task-specific neural program synthesis or executable artifact induction, ask about priority and compute, and produce a concrete CPU-friendly first experiment.

The main weaknesses are narrow but consistent. The baselines give useful rationale but less actual landscape. They often name candidate model families, but they less consistently situate the idea against program synthesis, NCA-style approaches, DSL search, compact-artifact scoring, or benchmark pressure. They give some failure criteria and baselines, but gap-exposing tests are less explicit than the research-agent condition. Recoverability usually lives in prose rather than a manager-style state summary with an approval boundary.

## Research-Agent Current Orient Pattern

The current-orient traces usually give a substantive initial read before any write approval. They frame the idea as compression-constrained per-task neural induction or executable artifact induction, give a light remembered landscape, ask decision-level questions, and use the scripted replies to narrow the frame.

The main improvement over the baseline is evaluation and failure discipline. The answers propose exact match, held-out variants, serialized artifact size, train time, inference time, primitive count or rollout steps, qualitative failure types, and compact symbolic or DSL baselines. They also state failure criteria before the first experiment and explicitly avoid writing records without approval.

## Model-Specific Notes

Reference default medium: both conditions were strong. The research-agent condition scored higher mainly from landscape, approval-gate discipline, and a clearer artifact-plus-evaluation frame.

Default low: the baseline stayed useful, but the research-agent condition preserved more uncertainty, named the candidate landscape, and gave clearer failure criteria.

GPT-5.4-Mini medium: the baseline was concise and useful but thinner on evaluation and recoverability. The research-agent condition was stronger overall, but lost one point on question quality because it bundled several questions before adapting to replies.

GPT-5.2 medium: the baseline produced a plausible tiny-conv experiment but leaned toward pure neural training and weaker interaction use. The research-agent condition gave a stronger evaluation and failure frame, but also bundled clarification questions up front.

## Write-Gate Check

All sweep target project files remained at the initialized template state after the traces. `state/current.md`, `briefs/project.md`, `resources/index.md`, and the work/review queues show no material orient updates after init.

## Operational Notes

The environment accepted six parallel subagents in the first wave and hit the thread limit on the two GPT-5.2 runs. The GPT-5.2 baseline and current-orient agents were launched after the first wave completed. This is an orchestration note, not a content severe error.

## Caveats

The run is a one-prompt regression test, not a broad benchmark. The scorer was not blind. The research-agent traces use remembered or candidate landscape rather than source-opening logs, so the result should be treated as evidence of useful landscape behavior rather than audited source-grounding behavior.
