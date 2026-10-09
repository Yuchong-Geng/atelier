# AI4Research 2026 Orient V2 NeuroGolf Eval

## Purpose

This eval tests whether the updated `orient.md` produces a more useful early research orientation than a freeform baseline on the same vague NeuroGolf-style multi-turn prompt used by the existing research-agent evals.

The claim is narrow. This eval measures orientation quality, not final research success, benchmark performance, or autonomous discovery.

## Conditions

`baseline` is a freeform assistant response. It receives the vague prompt and scripted follow-up replies. It does not use research-agent protocol files.

`research-agent` is a current-orient manager response. It starts from an initialized `.research-agent/` folder, uses the current `orient.md`, and receives the same prompt and scripted follow-up replies. The simulated user never grants write approval, so the manager should not materially update project records after init.

## Prompt

Use `harness/prompt.md`.

## Scoring

Use `rubric.md`. Record condition scores in `scores/score-table.csv` and qualitative findings in `scores/scoring-notes.md`.

## Outputs

The preliminary run uses `runs/current/`.

The model sweep uses:

- `runs/reference-default-medium/`
- `runs/default-low/`
- `runs/gpt-5.4-mini-medium/`
- `runs/gpt-5.2-medium/`

`runs/sweep-trace-capsules.md` records scoring-relevant trace capsules for the sweep.

## Intended Use

This is a focused regression test for the orient changes. It can support claims about early framing, rationale, evaluation awareness, and approval-gate discipline, but it should not be used as evidence that research-agent improves final scientific outcomes.
