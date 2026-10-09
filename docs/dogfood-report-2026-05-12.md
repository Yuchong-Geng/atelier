# Dogfood Report 2026-05-12

## Scope

This pass tested whether Atelier can support a realistic research arc beyond initial idea framing.

The main scenario started from init, then moved through orient, evaluation design, experiment planning, second-opinion review, manager resolution, evidence, claim update, and deliverable planning.

## Dogfood Targets

- Main target: `/tmp/Atelier-dogfood-main-20260512-01`
- Independent worker target: `/tmp/Atelier-dogfood-worker`

Both targets used the packaged skill and template path as the starting point. No source repo files were edited by worker agents.

## What Worked

The core protocol works as a manual research control plane.

The file loop was coherent once the project existed:

```text
packet.md -> report.md -> resolution.md -> evidence -> claim -> deliverable brief
```

The manager and critic roles stayed separate in the live subagent test. The critic wrote only `report.md`, then stopped. The manager then accepted the review, wrote a resolution, revised the pending experiment packet, and updated state.

The downstream skills are real enough for more than idea framing. The dogfood run reached a revised pilot experiment packet that could be run after source snippets, gold labels, prompts, and scoring rules are frozen.

## What Failed Or Felt Fragile

The installed-package init path was ambiguous. The global skill pointed to `assets/templates/` and `assets/project-skills/`, while init docs still used source-tree paths.

Copied template READMEs contained source-repo wording. A target project could read them as stale local guidance.

The experiment packet template did not match `plan_experiment.md`. The skill asked for result read, execution path, code readiness, and outcome mapping. The template used older fields.

Evidence records pointed to reports but not manager resolutions, even though evidence is the accepted manager read.

The shared report template defaulted to a work report, which made review reports rely on manual reinterpretation.

Queue and evidence indexes were too sparse for status reads. Work indexes lacked approval and compute fields. Review indexes lacked targets. Evidence and claims had no documented compact index shape.

The live second-opinion review exposed a real design risk. The pilot had to separate raw extraction quality, manager acceptance, recovery quality, and workflow overhead before any honest claim update.

## Adjustments Made

- Clarified source checkout paths versus installed-package asset paths in init guidance.
- Added init defaults for target folder, manager owner, critics, agent instructions, `.gitignore`, and derived project identity.
- Fixed manual fallback docs to include adapter snippets.
- Rewrote copied template READMEs as target-project docs.
- Aligned experiment packet fields with `plan_experiment.md`.
- Added `source_resolution` to evidence records.
- Made the report template neutral for work and review reports.
- Added `deliverable_plan` as a review type.
- Added structured frontmatter to `briefs/deliverable.md`.
- Documented work, review, evidence, and claim index schemas.
- Added `claims/index.yaml`.
- Added `.gitkeep` placeholders for empty queue and claim directories.

Root templates and packaged templates were synced after the edits.

## Remaining Gaps

There is still no init helper. A real user or agent must copy files, create directories, and fill `project.yaml` manually.

There is still no repo-local validator. This pass used temporary Ruby checks for JSON, YAML, frontmatter, package sync, and expected template fields.

There is no short manager walkthrough yet. The current skills are usable, but a compact worked path would make the first dogfood easier to repeat.

The first real evaluation should not use the original loose pilot design. The revised dogfood packet shows the needed controls.

## Morning Next Moves

1. Add a tiny init helper and validator.
2. Write a compact manager walkthrough from init through claim update.
3. Run the revised no-GPU pilot design on a small source set.
4. Or dogfood against a real project such as Rational-Model paper support once init and validation are less manual.
