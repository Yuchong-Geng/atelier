# Paper Notes

## Candidate Claim

In a full-state multi-turn case study, research-agent produced a recoverable project state and a corrected experiment plan from a vague ARC-style research idea. The workflow improved auditability by forcing bounded worker output, adversarial critique, manager resolution, and deliverable-facing state updates.

## Evidence From This Eval

- Same vague starting prompt and simulated user replies as the baseline.
- Baseline produced only transcript and final plan.
- Research-agent produced a canonical `.research-agent/` state tree.
- Worker report identified artifact-boundary validity as the central concern.
- Manager resolution accepted the strict artifact contract and created a blocking review.
- Critic report identified seven experiment-design risks.
- Manager resolution accepted all seven findings and updated project brief, current state, and deliverable brief.

## Suggested Table

Use a small artifact-presence table:

| Artifact | Baseline | Research-agent |
| --- | --- | --- |
| transcript | yes | yes |
| final plan | yes | yes |
| project config | no | yes |
| project brief | no | yes |
| current state | no | yes |
| work packet | no | yes |
| work report | no | yes |
| work resolution | no | yes |
| review packet | no | yes |
| review report | no | yes |
| review resolution | no | yes |
| deliverable brief | no | yes |

## Useful Excerpt Pair

Baseline:

The first-day plan is to implement generators, an evaluator, a coordinate MLP baseline, and a symbolic baseline, then report exact-match accuracy, artifact size, and fitting time.

Research-agent:

The first implementation should build the benchmark specification and artifact runner before solver models. The manager requires a runtime manifest, serialization rule, DSL tiers, generator split, and matched hybrid controls.

## Safe Wording

Safe:

The full-state protocol improved recoverability and validity repair in this case study.

Safe:

The case study evaluates research steering and experiment design, not downstream ARC performance.

Unsafe:

The system proves that multi-agent research is correct.

Unsafe:

The system solves NeuroGolf or ARC.

Unsafe:

The system completed the full manager loop autonomously without interruption.

## Limitation To Report

Two manager subagents stalled. The harness resumed from durable state. This should be reported as an implementation limitation and a recovery demonstration, not hidden.
