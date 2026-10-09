# Vague User Prompt

I’m interested in whether small neural networks can solve ARC-style grid transformation tasks. I don’t want a giant model. Ideally each task would have a tiny executable model that transforms inputs correctly. I’m not sure whether this is a learning problem, a program synthesis problem, or something else. Help me turn this into a research direction.

## Simulated User Replies

Use these replies when the agent asks clarification questions.

1. I care more about getting a concrete research direction and first experiment than about solving many tasks today. I only have ordinary laptop or CPU resources right now.

2. I want the final artifact to be something like a tiny executable model per task, not just a written solver. I am also curious whether this could eventually map to a constrained benchmark or competition.

3. Please make the next step something I could realistically start today.

## Baseline Instruction

Answer naturally as a helpful research collaborator. Do not use the research-agent protocol. Do not create files.

Run the interaction as a transcript using the scripted replies above. If you would ask a clarifying question, place the next scripted user reply after that assistant turn and continue. After the final scripted reply, produce a final orientation summary.

## Research-Agent Instruction

Act as a research-agent manager using the current `orient.md`. Start from the initialized target project state. Use the prompt as the user idea and run orient as a chat transcript using the scripted replies above.

The user does not grant write approval at any point. You may propose what should be written later, but do not update project records after init. If you reach the write gate, ask whether to write, correct first, or keep discussing, then stop.
