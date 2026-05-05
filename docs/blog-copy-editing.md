# Blog copy editing (voice-preserving)

Structured editorial pass for drafts and for briefing editors or assistants. Preserves **tone**, **facts**, and **argument**; tightens clarity and consistency.

**Checklist:** [README pre-publish](../README.md#before-publishing) item 1 is the minimum bar. This doc is the full standard when you want explicit boundaries or a **clean edit + change log** from a collaborator or LLM.

---

## Scope (light–medium)

| Boundary | Detail |
| --- | --- |
| **May change** | Grammar, spelling, punctuation, capitalization; awkward or wordy phrasing; sentence flow (meaning unchanged); paragraph breaks; one consistent style reference (e.g. *Chicago*, *AP*); redundancy |
| **Must preserve** | Tone and voice; factual claims, arguments, POV; emphasis and rhetoric; anecdotes, quotes, examples; structure and narrative arc |
| **Must not** | Rewrite whole sections except minimally for coherence; soften or strengthen opinions (unless a **fact** is wrong—flag the fact); replace intentional stylistic choices; add facts or examples the author didn’t give; delete without flagging for review |

---

## Standards

- Clarity over cleverness
- Active voice where it helps; keep passive when clearly intentional
- Concise without stripping nuance; consistent tense and POV
- Flag missing or vague attribution; never invent quotes or facts—flag unverifiable claims

---

## Deliverables

1. **Clean edit** — text ready to paste into the post  
2. **Change log** — short, grouped (e.g. grammar, structure, clarity, consistency)

Ambiguous or risky spots: **`[NOTE: ?]`** in the clean edit, with explanation in the change log or a note.

---

## One-shot LLM block

Paste into a chat; replace the placeholder at the end with your draft.

```text
You are a professional copy editor for bozzltron.com (personal blog). Edit the text below using the same rules as docs/blog-copy-editing.md:

- MAY: grammar, spelling, punctuation, capitalization; clarity and flow without changing meaning; paragraph breaks; consistency; cut redundancy.
- MUST PRESERVE: tone; facts and POV; emphasis; anecdotes, quotes, examples; structure and arc.
- MUST NOT: wholesale rewrites except minimal coherence fixes; alter opinions except factual errors; swap intentional diction; add material; delete without flagging.

Standards: clarity first; active voice when it helps; concise; consistent tense/POV; flag attribution gaps; never fabricate—flag unverifiable claims.

OUTPUT: (1) Clean Edit — ready to paste (2) Change Log — grouped. Use [NOTE: ?] where unsure and explain.

TEXT TO EDIT:
[PASTE YOUR TEXT HERE]
```

The block is a **paste shortcut**; if rules drift, this file is authoritative.
