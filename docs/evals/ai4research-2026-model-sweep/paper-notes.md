# Paper Notes

## Candidate Result Sentence

Across four model and effort settings, the research-agent protocol improved manual rubric scores from 16.5 to 19.25 out of 20 on average, with no severe errors in either condition.

## Safer Result Sentence

In a deadline-oriented sweep across four model and effort settings, research-agent outputs were consistently more recoverable and critique-aware than freeform baselines, improving manual rubric scores by 2 to 4 points out of 20.

## Best Figure

Use a compact table:

| Setting | Baseline | Research-agent | Main observed gain |
| --- | ---: | ---: | --- |
| default medium | 16 | 20 | full state plus real worker and critic |
| default low | 16 | 18 | recoverability despite weaker design repair |
| GPT-5.4-Mini medium | 18 | 20 | benchmark-contract state trail |
| GPT-5.2 medium | 16 | 19 | uncertainty preserved as explicit synthesis-vs-neural question |

## Claim To Make

The protocol helps preserve correctness-relevant structure under model and effort changes. The improvement appears most clearly in durable state, critique resolution, and deliverable caution.

## Claim To Avoid

Do not claim that research-agent makes weaker models as good as stronger models.

Do not claim a statistically powered result.

Do not claim autonomous completion. The reference run required recovery from durable state, and the sweep used a deadline one-pass role simulation.

Do not claim that the final scientific direction is settled. The sweep shows that the model choice affects whether the project is framed as tiny neural modeling, symbolic synthesis, or a hybrid benchmark contract.

## Recommended Paper Placement

Main paper:

- one paragraph describing the sweep
- one table with scores
- one sentence on limitations

Appendix:

- raw prompts
- raw outputs
- detailed rubric
- scoring notes
- deadline harness caveat
