# Open Questions

The current architecture snapshot is `docs/system-blueprint.md`. This file tracks questions not yet settled by that blueprint.

## Artifact Templates

- Should initialized projects retain local item templates under `.atelier/templates/`, or should those templates stay only in the global package source tree?
- What minimal validation should users be able to run from local files without depending on the global package?

## Adapter Mechanics

- What is the lowest-friction generic adapter for company-approved agents?
- Should later versions automate Codex-Claude second-opinion handoff, or keep v0 manual packet handoff as the default?
- Should effort mapping stay qualitative, or should adapters eventually carry platform-specific model and reasoning profiles?

## V0 Implementation Scope

- What minimal validator should users be able to run after the init helper, before `status` or other CLI wrappers?
- Which workflow should be the next real dogfood test: Rational-Model paper work, this repo's own implementation, or the no-GPU pilot in `docs/dogfood-report-2026-05-12.md`?
- Should Superpowers integration be documented as adapter guidance first, or wired into implementation work templates from v0?
