# Writing rules

## Scope

These rules apply to written English prose in deliverables (papers, docs, commit messages, code comments). Chat is exempt. They do not govern language syntax in code or structured data. Colons in YAML keys, semicolons in JavaScript, em-dashes in markdown tables, and similar syntactic uses are unaffected by the bans below.

## Default rules (apply to all English prose in deliverables)

Punctuation
- No ":" as a sentence connector or to introduce an explanatory clause. Use a period, recast, or split.
- No ";" as a sentence connector. Split into two sentences.
- No em-dash ("—") inside sentences as a clause connector. Use a period or comma, or recast. Hyphens in compound words (pre-trained, well-known) and en-dashes for ranges (1990–2000) are unaffected.

Demonstratives and bare pronouns
- No standalone "this", "that", "these", "those" as a noun. Always pair with the referent ("this method", "those results").
- Same rule for "it", "they", "such" when the referent is not unambiguous within the prior clause.

Hedges and empty intensifiers
- No "it is worth noting", "it should be mentioned", "importantly", "notably", "interestingly", "crucially". Cut them, or make the argument that earns the emphasis.

Filler transitions
- No "moreover", "furthermore", "additionally", "thus", "hence" as default connectors. If the logic flows, they are unnecessary. If it does not, fix the logic, not the connector.

AI tell-vocabulary
- No "delve", "leverage", "robust", "comprehensive", "seamless", "tapestry", "navigate the landscape", "in today's fast-paced world", "unlock", "harness", "realm", "showcase". These words signal AI authorship without adding meaning.

Meta-commentary about the text
- No "in this paper/section, we will...", "as discussed above", "as mentioned earlier", "it is important to note that". State the substance, not what the text is doing.

Redundant pairings
- No "each and every", "various different", "first and foremost", "end result", "past history", "future plans", "completely eliminate".

Throat-clearing openings
- No "In order to...", "It is the case that...", "When it comes to...", "There exists..." as prose openers. Start with the subject and the verb.

Vocabulary
- Aim for elegance through clarity. Reach for a sophisticated word when it carries the meaning more precisely or naturally than a plain alternative would. Reach for a plain word when the sophisticated one would obscure or read as performance. The test for any word is whether it makes the sentence land for an attentive reader, not whether it signals effort.
- Avoid day-to-day or colloquial phrasing ("final say", "stands behind", "comes down to", "dogfood pass") when a more formal alternative ("authority", "endorses", "rests on", "reflexive use") conveys the same meaning at the register academic prose expects. The opposite failure mode, ornamental words used to sound impressive, is covered under AI tell-vocabulary above.

Show, don't label
- Do not call a result "important", "interesting", "surprising", or "novel". Let the substance prompt the judgment.

Honesty about claims
- Do not hedge in one sentence and assert in the next. If a claim is uncertain, mark it as uncertain throughout. If it is established, assert it cleanly.

## Argumentative writing (papers, multi-paragraph docs)

These rules add to the defaults when the goal is to argue a position over multiple paragraphs.

Logic flow
- Every sentence should advance the argument. Cut sentences that restate, summarize what was just said, or telegraph what is coming next.
- Every paragraph should have a function in the overall structure. If deleting it leaves the argument intact, delete it.

Rhetorical variation
- Vary sentence length across neighbors. Mix short declarative sentences with longer complex ones.
- Vary paragraph length. Mix short paragraphs (one or two sentences) for emphasis or transition with longer paragraphs (four to six sentences) for development. Uniform medium-length paragraphs are a common AI tell.
- Vary sentence opening structure. Do not stack three sentences in a row that all begin with the subject, or all begin with a participial phrase.
- Avoid the triadic reflex (every list is three items). Lists of two, four, or five are often more honest to the content.

Prose over bullets
- Default to prose for argumentative writing. Reserve bullets for genuinely parallel enumerable items, not for breaking a paragraph into chunks.

## Bibliography Safety

Do not invent citations, citation keys, or BibTeX entries from memory.

Edit `refs.bib` only when the source has been verified through a reliable source such as arXiv, OpenReview, DOI/CrossRef, DBLP, Semantic Scholar, PMLR, ACL Anthology, or an official project page.

If a citation cannot be verified, leave `[CITATION NEEDED]` in the TeX source and explain what needs verification. Do not add guessed metadata.

Keep citation keys stable once used in `main.tex`.

After bibliography changes, run:

```sh
latexmk -pdf -interaction=nonstopmode -halt-on-error main.tex
```

## Math and formal-statement carveouts

When writing inside derivations, proofs, theorem statements, or notation definitions, the following override the defaults.

- "There exists $x$ such that..." is allowed as a formal mathematical statement.
- "Thus", "hence", "therefore" are allowed when they mark a genuine inference step in a derivation or proof.
- A colon may introduce a displayed equation ("we have:" followed by a display equation). The prose colon ban applies between prose clauses, not before a math display.
- Passive voice is allowed where convention dictates ("is given by", "is defined as", "is modeled as").
