# Protocol

Use `harness/prompt.md` as the frozen prompt and simulated user replies.

## Baseline

The baseline condition is a freeform multi-turn chat and writes:

- `runs/<variant>/baseline/transcript.md`
- `runs/<variant>/baseline/final-plan.md`
- `runs/<variant>/baseline/run-metadata.md`

## Research-Agent

The research-agent condition writes canonical state under:

`runs/<variant>/research-agent/target-project/.research-agent/`

Each role writes only its assigned artifacts.

Manager init writes:

- `project.yaml`
- `state/current.md`
- `briefs/project.md`
- `resources/index.md`
- `logs/research-log.md`
- `work/active/W-20260512-001/packet.md`
- `work/index.yaml`
- run transcript

Worker writes:

- `work/active/W-20260512-001/report.md`

Manager resolution writes:

- `work/active/W-20260512-001/resolution.md`
- updated `state/current.md`
- updated `briefs/project.md`
- `reviews/active/R-20260512-001/packet.md`
- `reviews/index.yaml`
- updated transcript

Critic writes:

- `reviews/active/R-20260512-001/report.md`

Final manager writes:

- `reviews/active/R-20260512-001/resolution.md`
- updated `state/current.md`
- updated `briefs/project.md`
- updated `briefs/deliverable.md`
- updated indexes and log
- `runs/<variant>/research-agent/final-plan.md`
- `runs/<variant>/research-agent/run-metadata.md`
- updated transcript

## Operational Recording

If any manager, worker, or critic stalls, the harness records the stall and resumes from durable state. This should be treated as an operational limitation, not hidden.
