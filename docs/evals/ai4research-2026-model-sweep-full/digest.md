# Digest

## Result

The full role-separated model sweep supports including the multi-turn eval in the paper.

| Setting | Baseline | Research-agent | Delta |
| --- | ---: | ---: | ---: |
| reference default medium | 16 / 20 | 20 / 20 | +4 |
| default low | 16 / 20 | 20 / 20 | +4 |
| GPT-5.4-Mini medium | 18 / 20 | 20 / 20 | +2 |
| GPT-5.2 medium | 16 / 20 | 20 / 20 | +4 |

Mean baseline score: 16.5 / 20.

Mean research-agent score: 20 / 20.

Mean improvement: +3.5 / 20.

No severe content errors were recorded.

## What The Full Sweep Adds

The deadline shortcut sweep showed that lower model and effort settings still benefited from the file-backed protocol. The full sweep is stronger because it restores role separation.

Each research-agent run now follows the expected structure:

1. Manager initializes canonical project state and creates a work packet.
2. Worker writes a bounded report.
3. Manager resolves the worker report and creates a review packet.
4. Critic writes an adversarial review.
5. Manager resolves the review, updates state and briefs, and writes a final plan.

The result is more faithful to the system claim than a prompt-style or one-pass role simulation.

## Main Finding

The baseline agents were generally competent. They recovered the tiny per-task executable-artifact idea, respected CPU constraints, and proposed plausible first experiments.

The research-agent runs were stronger where the paper cares most:

- durable state
- bounded delegation
- explicit manager resolution
- adversarial critique
- deliverable caution
- recoverable next work

The final research-agent plans did not rush into implementation. All three full-sweep variants concluded that benchmark-contract work should precede solver code. This is the right behavior for a correctness-oriented workflow.

## Operational Limits

The full sweep still exposed orchestration issues.

The reference default-medium run had manager stalls and required recovery from durable state.

The GPT-5.4-Mini full sweep had one wrong-path critic write. The mistaken artifact was preserved under `run-errors/`, then the affected worker and critic stages were rerun cleanly.

These are not content severe errors, but they matter. The paper should say the protocol improves recoverability and auditability, not that the implementation is fully autonomous or error-free.

## Paper-Facing Interpretation

Safe claim:

> In a role-separated multi-turn sweep across model and effort settings, research-agent produced more recoverable and critique-aware research plans than freeform baselines, improving manual rubric scores by 2 to 4 points out of 20.

More precise claim:

> The advantage appeared in state recoverability, explicit critique resolution, and benchmark-contract repair rather than in generic idea generation.

Avoid claiming:

- research-agent improves final scientific outcomes
- research-agent solves ARC or NeuroGolf-style tasks
- the result is statistically powered
- the implementation completed every run without operational intervention

## Recommended Use In Paper

Use the full role-separated sweep as the main multi-turn evidence.

Use the deadline shortcut sweep only as a secondary operational note or appendix artifact.

Use the single-turn pilot as a smaller complementary result about prompt-level orientation and claim discipline.
