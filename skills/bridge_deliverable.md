---
name: bridge_deliverable
description: Use when claims, evidence, artifacts, and audience need to be turned into a paper, report, presentation, demo, poster, memo, or other deliverable plan.
---

# Bridge Deliverable

## Purpose

Turn research state into a deliverable brief.

This skill decides what belongs in the final output and what role each item should play. It does not write the paper, report, slides, or demo script.

The output is `.atelier/briefs/deliverable.md`.

## Read First

- `.atelier/project.yaml`
- `.atelier/state/current.md`
- `.atelier/briefs/project.md`
- `.atelier/briefs/deliverable.md` if present
- relevant claims
- relevant evidence
- relevant work or review resolutions
- relevant artifacts, plots, tables, demos, paper sections, or presentation drafts

## Deliverable Target

Identify the target output.

- paper
- technical report
- internship final presentation
- demo
- poster
- internal decision memo
- blog or public explanation
- other

## Bridge Questions

Build or update the deliverable brief around these questions.

- Audience. Who needs to be convinced or informed?
- Core story. What should the deliverable say at the highest level?
- Lead claims. Which claims carry the deliverable?
- Evidence map. Which evidence supports each claim?
- Inclusion plan. What belongs in the main output, appendix, backup, limitation, future work, or excluded set?
- Needed artifacts. What figures, tables, plots, proof sketches, demos, screenshots, examples, or code outputs are still needed?
- Blockers. What prevents the deliverable from being ready?
- Next moves. What concrete work, review, evidence, claim, or writing actions should happen next?

## Inclusion Roles

Use plain roles when organizing material.

- Lead claim
- Main result
- Supporting result
- Ablation or diagnostic
- Qualitative example
- Figure or table
- Demo moment
- Appendix or backup
- Limitation
- Future work
- Internal-only note
- Excluded or not ready

## Style Context

Read project writing guidance when available.

Adapt writing guidance to the deliverable type. Do not force prose-specific rules onto slides, figures, tables, code comments, formal math, or structured templates.

## Deliverable Brief Output

Create or update `.atelier/briefs/deliverable.md`.

Use this frontmatter.

```yaml
---
type: deliverable_brief
target: paper | technical_report | presentation | demo | poster | memo | blog | other
status: draft | active | ready | historical
updated: YYYY-MM-DD
lead_claims: []
evidence_links: []
---
```

Use this body structure.

```markdown
# Deliverable Brief

## Target

## Audience

## Core Story

## Lead Claims

## Evidence Map

## Inclusion Plan

## Needed Artifacts

## Blockers

## Next Moves
```

## Follow-Up

Create follow-up packets only when the next action is concrete and fits the user's current operating intent.

Common follow-up outputs include:

- work packet for a figure, table, demo, or artifact
- work packet for missing evidence
- work packet for implementation or experiment work
- review packet for a lead claim or deliverable plan
- claim update
- evidence update
- deliverable brief update

Actual paper, report, slide, or demo production should happen through a separate writing, presentation, or implementation workflow.

Before stopping as manager, run the stage-completion hook in `steer.md`.

## Stop Condition

Stop when:

- `.atelier/briefs/deliverable.md` is created or updated
- lead claims and supporting evidence are mapped
- inclusion roles are assigned
- blockers and needed artifacts are visible
- next moves are recorded or created

## Do Not

- Do not write the full deliverable by default.
- Do not include unsupported claims as lead claims.
- Do not copy raw artifacts into the brief.
- Do not force one writing style across all deliverable formats.
