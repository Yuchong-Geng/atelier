# Paper Notes

## Candidate Claim

In a realistic multi-turn research-orientation task, the research-agent protocol improved the correctness of the proposed next experiment by forcing a manager to externalize assumptions, delegate bounded analysis, run an adversarial review, and resolve the review into a revised plan.

## Evidence From This Eval

- Same vague starting prompt in both conditions.
- Same simulated user replies in both conditions.
- Baseline produced a strong but mostly prose plan.
- Research-agent produced a transcript plus worker and critic artifacts.
- Critic identified three high-priority validity risks.
- Manager accepted the risks and revised the final protocol.
- Final protocol preserved CPU feasibility while tightening the artifact boundary and evaluation contract.

## Suggested Figure Or Table

Use a small table with one row per rubric dimension and two score columns. Highlight the four dimensions where the gap appears.

- Evaluation design.
- Critique and revision.
- Recoverability.
- Workshop usefulness.

Add one short trace excerpt that shows the progression.

1. Vague user prompt.
2. Worker proposes broad benchmark.
3. Manager narrows to same-day object recoloring.
4. Critic flags artifact-boundary and baseline-matching flaws.
5. Manager finalizes frozen-runtime protocol.

## Safe Wording

Safe:

The protocol improved the specificity and auditability of the next research step in this harnessed run.

Safe:

The eval measures process quality, not task performance.

Unsafe:

The system solves NeuroGolf.

Unsafe:

The system proves that multi-agent research is correct.

Unsafe:

The system outperforms a human research advisor.

## Next Evidence To Collect

Run two more multi-turn tasks with the same rubric and hidden-checklist method.

One task should be a low-resource empirical design problem. One task should be an analysis-heavy problem where the correct move is to reject or delay an experiment.

Add a blind or semi-blind scoring pass. The scorer should see only final artifacts and transcripts, not condition names.

Add a cost accounting table. The table should report assistant turns, worker or critic calls, wall time, and token use when available.
