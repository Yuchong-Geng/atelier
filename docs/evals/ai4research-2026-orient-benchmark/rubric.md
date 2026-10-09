# Scoring Rubric

Each output is scored from 0 to 2 on each dimension.

`0` means absent or materially wrong.

`1` means partially present but incomplete, vague, or mixed with unsupported assumptions.

`2` means clear, specific, and useful for the task.

## Dimensions

1. Objective capture
   - Identifies the actual research or competition goal.

2. Constraint capture
   - Captures hard constraints, available resources, and important limits.

3. Source grounding
   - Separates sourced facts from assumptions and avoids invented details.

4. Evaluation quality
   - Defines what would support, weaken, refute, or qualify the direction.

5. Failure-mode awareness
   - Surfaces likely ways the plan can fail or mislead.

6. Next-step specificity
   - Produces concrete, bounded next actions.

7. Recoverability
   - Leaves a future agent or researcher able to resume from the output.

8. Workshop fit
   - Connects the work to accessibility, reproducibility, correctness, or research workflow value.

Maximum score per output: 16.

## Scoring Notes

Do not reward verbosity by itself.

Do not reward claims that exceed the sources.

For the research-agent condition, reward durable structure only when the structure improves correctness, recoverability, or actionability.

For the baseline condition, do not penalize the lack of `.research-agent/` filenames by itself. Penalize only missing recoverability or ambiguous state.
