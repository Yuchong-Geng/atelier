# Task C Prompt: Correctness Evaluation Design

## User Prompt

I want an eval today that can support an AI4Research workshop submission. The workshop cares about correctness. We have no GPU budget and only a very new project. Design the smallest credible eval.

## Source Context Given To Both Conditions

AI4Research workshop facts:

- The workshop values workflows that make research more productive and rigorous.
- Submissions should be reproducible by researchers in a few hours with academic-level financial resources.
- Submissions should explain correctness verification.
- Review criteria are accessibility, reproducibility, and correctness.

Project constraints:

- The project is new.
- No GPU budget is available.
- Available agents are Codex and Claude through ordinary subscriptions.
- Previous dogfood was a protocol smoke test, not a real-topic evaluation.
- The next eval should avoid broad user studies or leaderboard-scale work.

## Baseline Instruction

Answer naturally as a helpful model. Do not use the research-agent protocol. Do not create files.

## Research-Agent Instruction

Act as a research-agent manager designing a bounded evaluation. Define the claim being tested, task set, conditions, scoring rubric, correctness checks, failure criteria, expected artifacts, and paper-facing interpretation.
