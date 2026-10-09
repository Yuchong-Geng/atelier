# Dogfood Report 2026-05-15 Orient Loop

## Scope

This pass tested the updated recurring orientation loop against the same Predictive IB topic used in the human-test project.

The target project was the disposable `research-agent-human-test` workspace. The run simulated a manager loop through orientation, related-work mapping, evaluation framing, implementation scoping, and re-orientation.

## What Worked

The updated orientation loop handled the return path correctly. Related work changed the frame from general video pretraining to minimum-sufficient predictive video memory. Evaluation then made the differentiator concrete. Implementation scoping refused to start code because no target repo, dataset, future latent encoder, or baseline command was registered.

The final manager state is more polished than the initial frame. It now treats V-JEPA-style latent prediction as the direct threat model and uses the conditional bottleneck as the claimed mechanism.

The file loop stayed recoverable.

```text
packet.md -> report.md -> resolution.md -> canonical update -> orient again
```

## What Failed Or Felt Fragile

The target project's local `orient.md` copy had drifted behind the package template. The simulation had to sync the human-test copy before exercising the updated loop.

The run was manager-authored rather than executed by separate worker or critic agents. This was acceptable for a deterministic protocol simulation, but it did not test live handoff behavior.

The implementation stage correctly returned `needs_context`, but the workflow still relies on the manager to notice that this is a successful loop-back rather than a failure.

## Files Written In The Target Project

- `.research-agent/briefs/project.md`
- `.research-agent/resources/index.md`
- `.research-agent/state/current.md`
- `.research-agent/logs/research-log.md`
- `.research-agent/work/index.yaml`
- `.research-agent/work/closed/W-20260515-001-related-work-map/`
- `.research-agent/work/closed/W-20260515-002-evaluation-frame/`
- `.research-agent/work/closed/W-20260515-003-implementation-scope/`

## Recommended Adjustments

1. Add an upgrade or sync path for project-local skills so initialized projects can pick up protocol updates intentionally.
2. Add a lightweight validator that flags stale project-local skill copies when the source package has changed.
3. Document that `needs_context` from implementation scoping can be a successful outcome when the correct next step is re-orientation.
4. Run a second pass with a live critic packet before treating the polished Predictive IB frame as paper-ready.
