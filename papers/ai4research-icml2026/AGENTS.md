# Paper Instructions

## Paper Writing Process

Follow `paper-plan.md` for the paper's central theme and section logic.

Before drafting or rewriting any section in `main.tex`, first write or update the section's logic flow in `paper-plan.md`. The logic flow should state the section question, the point the reader should accept, the supporting evidence or mechanism, and the claims to avoid.

Do not repeat the root writing style guide here. The project-level style rules still apply to paper prose.

## Bibliography Safety

Do not invent citations, citation keys, or BibTeX entries from memory.

Edit `refs.bib` only when the source has been verified through a reliable source such as arXiv, OpenReview, DOI/CrossRef, DBLP, Semantic Scholar, PMLR, ACL Anthology, or an official project page.

If a citation cannot be verified, leave `[CITATION NEEDED]` in the TeX source and explain what needs verification. Do not add guessed metadata.

Keep citation keys stable once used in `main.tex`.

After bibliography changes, run:

```sh
latexmk -pdf -interaction=nonstopmode -halt-on-error main.tex
```
