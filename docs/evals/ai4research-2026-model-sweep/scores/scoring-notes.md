# Scoring Notes

## Summary

The sweep adds three lower-setting runs to the existing default-medium full-state reference.

The protocol advantage persists across the sweep. Research-agent full-state outputs scored higher than freeform baselines in every model or effort setting. The gain was largest in recoverability and critique discipline. The gain was smaller when the baseline already proposed a strong benchmark contract.

## Aggregate Result

| Run | Baseline | Research-agent | Delta |
| --- | ---: | ---: | ---: |
| reference-default-medium | 16 | 20 | +4 |
| default-low | 16 | 18 | +2 |
| gpt-5.4-mini-medium | 18 | 20 | +2 |
| gpt-5.2-medium | 16 | 19 | +3 |

Mean baseline score: 16.5 / 20.

Mean research-agent score: 19.25 / 20.

Mean delta: +2.75 / 20.

No severe errors were recorded.

## Reference Default Medium

The reference run is the full-state eval at `docs/evals/ai4research-2026-multiturn-neurogolf-fullstate`.

The baseline produced a strong freeform plan. The research-agent condition produced canonical state, work and review packet chains, manager resolutions, and a deliverable brief. The critic materially changed the plan by tightening runtime manifests, serialization, DSL tiers, generator holdouts, and hybrid controls.

## Default Low

The baseline remained competent. It framed the idea as compact neural task compilation and proposed a CPU pilot with small generated tasks.

The research-agent condition improved recoverability and critique discipline but produced a weaker final experiment than the reference. It drifted toward selecting same-size official ARC tasks and fitting a coordinate/neighborhood transducer. The critic caught selection-rule, preprocessing, and output-shape concerns. The protocol still helped, but the low-effort manager did not revise the final plan as deeply as the reference run.

## GPT-5.4-Mini Medium

This was the cleanest sweep replication. The baseline was already strong. It proposed a frozen runtime, object recoloring family, symbolic selector, and tiny learned selector.

The research-agent condition still improved the artifact trail. It produced canonical state, explicitly made the benchmark contract the next work item, and used the critic report to reject solver-first implementation.

## GPT-5.2 Medium

The baseline and research-agent condition both shifted toward program synthesis. This is coherent with the user's uncertainty about learning versus synthesis, but it weakens the specific "tiny neural model" emphasis.

The research-agent condition scored higher because it left project state, work and review chains, a deliverable brief, and explicit open questions about what counts as a tiny executable model. It is useful for the paper as evidence that the protocol can preserve uncertainty instead of forcing a neural framing.

## Limitations

The sweep was run under a deadline harness. In the three new sweep variants, the research-agent condition wrote worker and critic reports in one pass rather than launching separate worker and critic agents. The earlier reference full-state run used separate worker and critic agents but had manager stalls that required recovery from durable state.

The scorer was not blinded to condition labels.

The exact inherited default model identifier is not exposed by the local tool surface. The sweep records `inherited-default` for those runs.

The sample is small. These scores support a workshop pilot claim, not a statistically powered model comparison.
