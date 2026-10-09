# Scoring Notes

## Summary

The full role-separated sweep repeats the multi-turn NeuroGolf-style eval with separate manager, worker, critic, and final-manager stages. It removes the deadline shortcut from `ai4research-2026-model-sweep`, where the research-agent condition wrote worker and critic reports in one pass.

The full sweep supports the same direction as the earlier runs. The research-agent condition scored higher than the freeform baseline in every setting. The gain comes from recoverability, critique resolution, claim caution, and better experiment-contract repair.

## Aggregate Result

| Run | Baseline | Research-agent | Delta |
| --- | ---: | ---: | ---: |
| reference-default-medium | 16 | 20 | +4 |
| default-low | 16 | 20 | +4 |
| gpt-5.4-mini-medium | 18 | 20 | +2 |
| gpt-5.2-medium | 16 | 20 | +4 |

Mean baseline score: 16.5 / 20.

Mean research-agent score: 20 / 20.

Mean delta: +3.5 / 20.

No severe content errors were recorded.

## Operational Incidents

Operational incidents are tracked separately from content severe errors.

The reference default-medium run had manager stalls. The harness recovered from durable `.research-agent/` state.

The full `gpt-5.4-mini-medium` sweep had one critic-stage path error. A critic wrote the critique into the worker report path. The mistaken output was moved to `run-errors/gpt-5.4-mini-medium-critic-wrong-path.md`, then the worker and critic stages were rerun cleanly before final scoring.

These incidents should be reported as implementation and orchestration limitations. They also show that the file-backed protocol makes failures recoverable and auditable.

## Default Low

The freeform baseline produced a practical tiny-convolutional-transducer pilot. It respected the CPU constraint and artifact requirement, but it stayed broad and did not repair validity risks through independent critique.

The research-agent condition produced the full state chain. The final manager accepted the critic's concerns and concluded that the plan is not implementation-ready. The next step is benchmark-contract work around one task family, one artifact schema, one lower-level module grammar, one CPU synthesis loop, factor-disjoint splits, and limited comparators.

## GPT-5.4-Mini Medium

The freeform baseline was strong. It already proposed object recoloring under distractors, frozen runtime features, symbolic selector search, and a tiny learned selector over the same features.

The research-agent condition still added value by creating explicit packet boundaries, critic resolution, and canonical state. The final manager accepted that the plan is not ready for implementation until the generator, artifact schema, module grammar, split protocol, budgets, and comparators are pinned.

The path error in the first critic attempt is an operational limitation, not a content finding.

## GPT-5.2 Medium

The freeform baseline shifted toward program synthesis with learned guidance. That is coherent with the prompt's uncertainty about learning versus synthesis, but it is weaker as a direct tiny-neural-model proposal.

The research-agent condition preserved the uncertainty while forcing explicit resolution. The final manager accepted most critic findings and marked the plan as blocked on benchmark-contract work around dataset identity, split hygiene, DSL semantics, compute budgets, and artifact formats.

## Reference Default Medium

The reference full-state run remains the cleanest role-separated trace because it used separate worker and critic agents and produced a strong corrected deliverable brief. Its manager stalls should be reported, but the run is useful because it demonstrates recovery from durable state.

## Interpretation

The full sweep supports a workflow-layer claim, not an outcome claim. Research-agent does not prove better science or ARC performance. It produces a more auditable path from vague idea to bounded next work, with explicit critique and manager-owned resolution.
