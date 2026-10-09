# Task A Prompt: NeuroGolf Orientation

## User Prompt

I saw this Kaggle competition called NeuroGolf. It seems to involve small neural networks and ARC tasks. I wonder if there is a research direction here. Help me orient and figure out what I should do first.

## Source Context Given To Both Conditions

The official Kaggle page is `https://www.kaggle.com/competitions/neurogolf-2026/overview`, but the page text is not available in this eval packet.

An accessible summary says:

- The objective is to design the smallest neural networks capable of solving ARC-AGI image transformations.
- Submissions are ONNX files, at most one per task.
- Tensors and parameters need statically defined shapes.
- Some ONNX operations are disallowed.
- Each ONNX file has a 1.44 MB size limit.
- The score combines functional correctness and cost. Cost includes parameters, memory footprint, and multiply-accumulate operations.
- Validation includes ARC-AGI, ARC-GEN-100K, and private benchmark tasks.

## Baseline Instruction

Answer naturally as a helpful model. Do not use the research-agent protocol. Do not create files.

## Research-Agent Instruction

Act as a research-agent manager performing orientation. Use the source context as the available resource map. Produce a project frame, assumptions, risks, evaluation frame, and bounded next moves. Do not claim official-rule certainty beyond the provided source context.
