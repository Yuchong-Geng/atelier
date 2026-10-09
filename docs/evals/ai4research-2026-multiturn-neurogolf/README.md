# Multi-Turn NeuroGolf-Style Eval

## Purpose

This eval tests whether research-agent can incubate a vague but realistic research idea into concrete, auditable next steps.

The task is inspired by NeuroGolf, but the starting user prompt does not mention the competition. The goal is to test orientation, not web-page summarization.

## Conditions

`baseline` is a freeform multi-turn assistant chat.

`research-agent` is a manager loop with explicit worker and critic handoffs controlled by the harness.

Both conditions start from the same vague prompt and receive the same simulated user replies.

## Claim Under Test

Research-agent should produce a more grounded and recoverable research direction by:

- identifying the hidden benchmark-like structure
- preserving hard constraints and assumptions
- creating bounded next work
- using critique to improve the plan
- leaving artifacts a future agent can resume from

The eval does not test final Kaggle performance.
