# Digest

## Result

| Condition | Score | Severe errors |
| --- | ---: | --- |
| Baseline | 16 / 20 | none |
| Research-agent | 20 / 20 | none |

The multi-turn eval supports a narrow claim. A file-backed manager loop with worker and critic handoffs produced a more recoverable and validity-aware research plan than a strong freeform assistant chat on the same vague prompt.

The baseline was not weak. It recovered the right problem class, proposed task-local executable artifacts, and produced a startable CPU experiment. The baseline fell short where workshop evidence matters most. It left the artifact boundary, baseline fairness, and hidden shortcut checks too implicit.

The research-agent run changed the plan after critique. The final plan moved from a broad tiny-model idea to a precise `object_recolor_v0` protocol with a frozen runtime, shared feature table, matched DSL and hybrid conditions, hidden slices, explicit redirect criteria, and recovery notes.

## What The Eval Demonstrates

The eval demonstrates workflow steering rather than scientific performance.

The starting prompt was vague. It mentioned small neural networks, ARC-style grids, tiny executable models, and uncertainty about whether the project was learning or synthesis. The research-agent loop converted that prompt into a concrete first experiment without relying on official competition details.

The strongest observed advantage was critique-mediated correction. The worker proposed a plausible benchmark. The manager reduced the scope to a same-day CPU task. The critic then found ways the reduced experiment could produce misleading positive results. The manager accepted the critique and revised the artifact and scoring contract.

## Paper-Relevant Interpretation

For an AI4Research workshop paper, this trace can serve as a process-correctness demo.

The paper should not claim that the system solves NeuroGolf or ARC. The paper can claim that the workflow made assumptions explicit, decomposed the research task, preserved review artifacts, and improved the falsifiability of the next experiment.

The trace is also useful because the baseline was competent. The comparison is not between research-agent and a strawman. The difference appears in auditability and validity repair, not in generic idea generation.

## Limitations

This is one topic and one harnessed run. The same model family likely appears in both conditions. The manager condition receives more turns and more total reasoning budget. The scorer is not blinded. The run evaluates plan quality and trace recoverability, not downstream benchmark accuracy.

The baseline used the `NeuroGolf` label without receiving that label in the starting prompt. The score records this as a source-framing risk. A stricter future run should isolate the baseline context or use a topic whose external name is never discussed in the surrounding thread.

The next eval should run the same protocol on at least two additional vague research ideas. One should be unrelated to ARC-style grids. One should require rejecting an initially appealing but invalid experiment.
