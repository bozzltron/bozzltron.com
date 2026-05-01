# bozzltron.com

Personal site and blog ([bozzltron.com](https://bozzltron.com)). Markdown in `source/` → Hexo → static **`public/`**. Hosts on **[Cloudflare Pages](https://pages.cloudflare.com/)**; CI and Pages should run **`npm run lint && npm run build`** and publish **`public/`**.

**Goals:** Readable type and a11y defaults, small stack (Hexo + vendored [Attila](https://github.com/zutrinken/hexo-theme-attila)-style theme), and this file as the canonical map for humans and agents.

## Editorial guidelines

**Length.** ~**900–1,200 words** (~5 min read) as a soft target. Use `<!-- more -->` for excerpts on **non-series** posts unless you set a custom **`excerpt:`** (below).

**Series: Influential music** — category **Influential music**, tag **`influential-music`**. Open with the **Jeff Tweedy / *World Within a Song*** acknowledgement, then the song hook. Filename: **`<band>-<song>.md`** (kebab-case, e.g. **`silverchair-tomorrow.md`**); do **not** put the series slug in the filename.

**Teasers (required for this series).** Shared Tweedy intro + `<!-- more -->` would make every listing identical. For each *Influential music* post add **`excerpt:`** in front matter (plain text, 1–3 sentences from the piece’s **unique** hook). **When `excerpt:` is set, do not use `<!-- more -->`** — Hexo skips the split and a stray HTML comment would otherwise appear in the body. See existing posts. Arc: (1) scene/facts (2) the music (3) why it sticks.

**References.** Cite dates, charts, quotes, rights, etc. Inline links or an end **References** block — one style per post. **Source quality:** prefer established outlets, official channels, and on-the-record interviews for **facts**; trade press (*Guitar.com*, etc.) for craft; **Wikipedia** only as orientation with spot-checks; avoid forums, fan wikis, and content farms for factual claims. Verify links, bylines, numbers, and photo credits before ship.

**Dictation.** Copy-desk pass: spelling, grammar, punctuation — **not** a voice rewrite. Extra facts belong next to citations or corrections.

**Posts vs drafts.** **`source/_posts/`** = shipped; **`source/_drafts/`** = not in production builds. No duplicate paths; edit published files only under **`_posts/`**.

## Stack and commands

| Piece | Role |
|--------|------|
| [Hexo](https://hexo.io/) 8 | Generator |
| `themes/attila/` | Theme (see `theme:` in `_config.yml`) |
| Node | `package.json` **`engines`** (≥ 20.19) |

```bash
npm install
npm run lint          # eslint + stylelint (theme)
npm run build         # → public/
npm run server        # local; uses _config.local.yml if present
npm run server:drafts # includes source/_drafts
```

**CI / Pages:** `.github/workflows/hexo-build.yml` runs **`lint`** then **`build`**. Match that on Cloudflare Pages; output dir **`public`**.

| File | Notes |
|------|--------|
| `_config.yml` | Site URL, **`root`**, permalinks (`root: /` assumes theme asset paths) |
| `_config.local.yml` | Local preview only — **gitignored**; copy from `_config.local.yml.example` |
| `themes/attila/_config.yml` | Menu, avatar, colors |

## Theme overrides (where to edit)

**Primary:** **`themes/attila/source/css/overrides.css`** — body / `.post-content` size (Attila uses `html { font-size: 62.5% }`; don’t flip `html` to `100%` without rebalancing `em` in bundled `style.css`). **Clamp**/gutters, skip link, category row, pagination layout, **reduced-motion**. **Dates:** `themes/attila/scripts/date-helpers.js` (relative phrases are **generate-time**, not live).

**Layouts:** `layout/_partial/article.ejs` (post, hero, nav), `archive.ejs`, `header.ejs`, `head.ejs` (meta, viewport).

**Checks before deploy:** tab order (skip → main `#main-content`), ~200% zoom, contrast if accents change; Lighthouse/axe on **`public/**/*.html`** optional.

## Repository hygiene

`public/`, `node_modules/`, `db.json`, `.deploy_*`, **`_config.local.yml`** → gitignored. Only **`themes/attila`** is active. **`npm run lint && npm run build`** must pass locally, in CI, and on Pages.

**Optional:** `cd themes/attila && npm run version` (Grunt) updates service-worker hash if you rely on it.

---

**Audience:** Maintainers and automation. Update this file when deploy steps, `_config.yml`, or theme override behavior changes materially.
