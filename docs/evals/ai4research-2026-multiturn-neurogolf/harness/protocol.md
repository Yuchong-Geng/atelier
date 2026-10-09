# Harness Protocol

## Baseline Condition

1. Send the vague prompt.
2. If the assistant asks clarification questions, answer using the simulated user replies in order.
3. Ask for a final concrete research plan.
4. Save the transcript and final answer.

## Research-Agent Condition

1. Send the vague prompt to a manager agent.
2. Answer manager questions using the simulated user replies in order.
3. Ask the manager to create bounded work and review packets.
4. The harness launches one worker from the work packet.
5. The harness returns the worker report to the manager.
6. The manager resolves the report and creates or requests a critic packet.
7. The harness launches one critic from the critic packet.
8. The harness returns the critic report to the manager.
9. The manager produces the final project frame, revised next step, and artifact summary.
10. Save the transcript, worker report, critic report, manager resolution, and final plan.

## Turn Budget

Keep both conditions to roughly comparable interaction budgets:

- Baseline: up to 5 assistant turns.
- Research-agent manager: up to 5 manager turns, plus one worker report and one critic report.

The research-agent condition is expected to have more artifact overhead. The digest should report this limitation.
