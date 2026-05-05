# Blog copy editing (voice-preserving)

Use this for a **structured editorial pass** on draft posts (and to brief assistants). It goes beyond spellcheck: it preserves your **tone**, **facts**, and **argument**, while tightening clarity and consistency.

**Relationship to the checklist:** The root **`README.md`** “Before publishing” list stays the single preflight index. Item **1 (Spelling and grammar)** is the minimum bar; **this file** is the full standard when you want a documented, voice-safe edit or an LLM-assisted pass with a **change log**.

---

## Editing scope (light to medium)

### What you can change

- Grammar, spelling, punctuation, and capitalization errors
- Awkward phrasing or wordiness that reduces clarity
- Sentence structure for better flow (without altering meaning)
- Paragraph breaks for readability
- Style consistency (pick one style guide reference—e.g. *Chicago*, *AP*—and apply it consistently)
- Redundant phrases or repetitive ideas

### What you must preserve

- The author’s original tone and voice (conversational, formal, passionate, etc.)
- All factual claims, arguments, and points of view
- Intended emphasis and rhetorical choices
- Personal anecdotes, quotes, and examples
- The overall structure and narrative arc

### What you should not do

- Do not rewrite entire sections unless absolutely necessary for coherence
- Do not soften or strengthen opinions unless they are **factually** wrong (then flag the fact, not the opinion)
- Do not change word choice that reflects intentional stylistic preference
- Do not add new information, examples, or arguments the author did not include
- Do not remove content without flagging it first for review

---

## Journalistic standards to apply

- **Clarity over cleverness** — prioritize reader comprehension
- **Active voice** where it helps (keep passive when it is clearly intentional)
- **Concise sentences** without stripping nuance
- **Consistent tense and point of view** through the piece
- **Proper attribution** when claims need it — flag where sourcing is missing or vague
- **No invented quotes or facts** — if something seems unverifiable, flag it

---

## Output format (assistant / collaborator)

When an editor or model returns work, ask for **two parts**:

1. **Clean edit** — the edited text ready to paste into the post
2. **Change log** — a short summary of major changes, grouped by type (e.g. grammar, structure, clarity, consistency)

For anything ambiguous or risky, use **`[NOTE: ?]`** in the clean edit and explain the concern in the change log or a short sidebar.

---

## Optional: one-shot prompt for an LLM

Paste the block below into a chat when you want a full pass on a single chunk of prose. Replace the placeholder at the end with your draft section(s).

```text
You are a professional copy editor working on bozzltron.com (personal blog). Edit the text I provide according to these rules:

EDITING SCOPE (light–medium):
You MAY fix: grammar, spelling, punctuation, capitalization; awkward or wordy phrasing; sentence structure for flow (meaning unchanged); paragraph breaks; internal style consistency; redundancy.
You MUST preserve: my tone and voice; all factual claims and POV; emphasis and rhetoric; anecdotes, quotes, examples; overall structure and narrative arc.
You MUST NOT: rewrite whole sections except when minimally needed for coherence; strengthen/weaken opinions except for factual errors; swap intentional stylistic word choices; add facts or examples I didn’t supply; delete content without flagging for my review.

JOURNALISTIC STANDARDS:
Clarity over cleverness; active voice when it helps (keep passive if intentional); concise but nuanced; consistent tense/POV; flag missing attribution; never fabricate quotes or facts—flag unverifiable claims.

OUTPUT:
1) Clean Edit — ready to paste
2) Change Log — grouped (grammar, structure, clarity, etc.)
Use [NOTE: ?] where you’re unsure and explain.

TEXT TO EDIT:
[PASTE YOUR TEXT HERE]
```

---

## Related

- **`README.md`** — **Editorial** → “Before publishing” checklist (meta, hero, excerpt, build, a11y, share, etc.).
