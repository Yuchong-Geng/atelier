# Digest

## Result

The model and effort sweep supports the same basic conclusion as the first full-state case study.

Research-agent full-state outputs scored higher than freeform baselines across all tested settings.

| Run | Baseline | Research-agent | Delta |
| --- | ---: | ---: | ---: |
| reference-default-medium | 16 / 20 | 20 / 20 | +4 |
| default-low | 16 / 20 | 18 / 20 | +2 |
| gpt-5.4-mini-medium | 18 / 20 | 20 / 20 | +2 |
| gpt-5.2-medium | 16 / 20 | 19 / 20 | +3 |

Mean baseline score: 16.5 / 20.

Mean research-agent score: 19.25 / 20.

Mean improvement: +2.75 / 20.

No severe errors were recorded.

## What Changed Across Models

The freeform baselines were usually competent. They recovered the broad task-local executable-artifact idea, preserved the CPU constraint, and proposed plausible same-day experiments.

The research-agent outputs were more consistently recoverable. Even when the research direction shifted, the protocol left project state, work reports, critic reports, manager resolutions, and deliverable briefs.

The weaker settings exposed useful failure modes.

The default-low research-agent run created the right artifact structure, but its experiment design was less mature. It leaned toward same-size official ARC tasks and a coordinate transducer. The critic caught important concerns, but the final plan did not repair the design as deeply as the reference run.

The GPT-5.2 run shifted toward program synthesis. This may be a valid interpretation of the vague prompt, but it moves away from the user's initial small-neural-model wording. The protocol helped preserve that uncertainty as an explicit question instead of hiding the shift.

The GPT-5.4-Mini run was the cleanest replication. It reproduced the benchmark-contract-first conclusion and left a strong canonical state trail.

## Paper-Facing Interpretation

This sweep supports a cautious workshop claim.

> In a small model and effort sweep, the file-backed research-agent protocol improved manual rubric scores over freeform prompting by increasing recoverability, critique visibility, and validity repair.

The paper should not claim statistical significance or general superiority across models. The result is a pilot and process demonstration.

## Why This Helps The Paper

The sweep reduces the risk that the first positive result was only a single strong-model trace. It shows that the protocol advantage appears under lower effort and smaller or older model settings.

The sweep also clarifies what the protocol does. It does not magically make every model produce the same scientific idea. It makes the model's assumptions, shifts, critique, and next steps more inspectable.

## Harness Limitation

The new sweep variants used a deadline harness. The research-agent condition wrote worker and critic reports in the same condition pass instead of launching independent worker and critic agents. The reference full-state run remains the stronger demonstration of actual role separation.

For the deadline paper, report this sweep as an ablation of the file-backed protocol surface, not as a perfect multi-agent autonomy benchmark.
