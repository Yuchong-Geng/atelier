# Paper Notes

## Candidate Title

Research-Agent: A File-Backed Workflow for Correctness-Oriented AI-Assisted Research

## Main Workshop Fit

The AI4Research call asks for reproducible workflows that help researchers use AI in core research work. This pilot targets research problem formulation, experiment design, verification, iterative loops, and correctness checks.

The contribution is not a new autonomous scientist. It is a project-local protocol that turns vague research intent into bounded artifacts:

```text
orient -> packet -> report -> resolution -> evidence -> claim -> review -> next packet
```

## Evaluation Claim

In a three-task same-day pilot, research-agent improved manual rubric scores on vague orientation and claim-sensitive tasks compared with freeform prompting. It tied baseline on an explicit eval-design prompt where the baseline was already strong.

The result supports a cautious claim:

> The protocol improves correctness-oriented structure and recoverability in early research workflows.

It does not support claims about final research performance, autonomous discovery, or broad productivity gains.

## Result Table

| Task | Baseline | Research-Agent | Difference |
| --- | ---: | ---: | ---: |
| NeuroGolf orientation | 10/16 | 14/16 | +4 |
| AI4Research claim extraction | 12/16 | 16/16 | +4 |
| Correctness eval design | 16/16 | 16/16 | 0 |
| Mean | 12.67/16 | 15.33/16 | +2.67 |

## What The Eval Actually Demonstrates

- The protocol helped separate source facts from assumptions.
- The protocol helped preserve hard constraints and uncertainty.
- The protocol made overclaiming easier to detect.
- The protocol produced more recoverable next steps.
- The protocol did not automatically beat a strong freeform answer when the prompt itself was already precise.

## What To Avoid Claiming

- Do not claim research-agent improves final benchmark performance.
- Do not claim the system has been validated on broad real research.
- Do not claim statistical significance.
- Do not claim correctness guarantees.
- Do not claim the current pilot proves time savings.

## Figure Idea

A compact figure can show the workflow as a correctness gate:

```text
Vague intent
  -> orient
  -> bounded packet
  -> report
  -> manager resolution
  -> evidence
  -> claim update
  -> review when claim-sensitive
```

Place the eval table beside the workflow to show that the measured gain is early-stage correctness structure, not final outcome performance.

## Appendix Artifacts

The paper can point to:

- frozen prompts
- source notes
- raw baseline outputs
- raw research-agent outputs
- scoring rubric
- score table
- scoring notes
- digest

These artifacts make the pilot reproducible in a few hours.
