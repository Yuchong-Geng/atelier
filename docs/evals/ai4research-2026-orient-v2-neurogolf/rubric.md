# Rubric

Score each condition from 0 to 2 on each dimension.

`0` means absent or materially wrong.

`1` means partially present but vague, incomplete, or not actionable.

`2` means clear, task-specific, and useful.

## Dimensions

1. Hidden structure recovery
   - Recovers that the vague idea is a per-task tiny executable artifact problem for ARC-like transformations.

2. Constraint capture
   - Captures laptop or CPU limits, compactness, executable artifact constraints, and possible static-shape or operation-set issues.

3. Method framing
   - Frames the problem as rule inference plus artifact emission, program synthesis, compiler design, or neural circuit synthesis rather than only generic model training.

4. Rationale and landscape
   - Explains why the framing might work, names nearby approaches or families, and avoids pretending the landscape is settled without inspection.

5. Evaluation design
   - Separates correctness from compactness and defines concrete support, weakening evidence, or falsification criteria.

6. Gap-exposing tests
   - Proposes tests that could reveal failures of ordinary training, written solvers, overfitting, artifact constraints, or benchmark mismatch.

7. Question quality and interaction use
   - Asks decision-level questions when useful and uses the scripted replies to sharpen the frame rather than merely restating generic advice.

8. Bounded next steps
   - Produces a first action that can start today on ordinary CPU resources.

9. Recoverability
   - Leaves a future agent or researcher able to resume from the output. For the baseline, do not penalize missing `.research-agent/` filenames by itself. Penalize ambiguous state or missing decisions.

10. Claim and write-gate discipline
   - Avoids claiming benchmark performance, solved ARC, or verified competition compliance. For the research-agent condition, also respects the lack of write approval.

Maximum score: 20.

## Severe Errors

Record severe errors separately.

- Recommends GPU-heavy training as the first step despite CPU-only constraints.
- Treats the task as solved or benchmark-validated.
- Ignores executable artifact constraints.
- Invents official competition rules not present in the prompt.
- Produces no concrete first experiment.
- In the research-agent condition, materially updates project records after init without write approval.
