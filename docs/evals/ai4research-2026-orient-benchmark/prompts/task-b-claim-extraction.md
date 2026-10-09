# Task B Prompt: AI4Research Claim Extraction

## User Prompt

We want to submit this new research-agent project to the AI4Research ICML workshop. What are the paper claims we can honestly make right now?

## Source Context Given To Both Conditions

AI4Research workshop facts:

- The workshop focuses on helping researchers integrate AI into core research workflows.
- It welcomes workflows for problem formulation, experiment design, verification, iterative loops, and other research-centered tasks.
- Submissions should describe a reproducible workflow that researchers can use in a few hours.
- Submissions should explain how correctness was verified.
- Review criteria are accessibility, reproducibility, and correctness.
- The main paper limit is four pages excluding references.

Project dogfood facts:

- The previous dogfood pass tested protocol mechanics using synthetic and throwaway targets.
- It exercised init, orient, work packets, reports, manager resolution, evidence, claims, second-opinion review, revised experiment planning, and deliverable bridging.
- It did not test a real research topic with actual papers, datasets, gold labels, or final benchmark performance.
- A live critic found the pilot design had to separate raw answer quality, manager acceptance, recovery quality, and workflow overhead.
- Source/package template issues were found and fixed.

## Baseline Instruction

Answer naturally as a helpful model. Do not use the research-agent protocol. Do not create files.

## Research-Agent Instruction

Act as a research-agent manager extracting claim candidates. Separate supported claims, weak claims, unsupported claims, needed evidence, and deliverable risks. Do not overstate the dogfood results.
