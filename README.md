# bozzltron.com

Personal site and blog ([bozzltron.com](https://bozzltron.com)). Markdown in `source/` → Hexo → static **`public/`**. Host on **[Cloudflare Pages](https://pages.cloudflare.com/)** with **`npm run lint && npm run build`** publishing **`public/`**.

## Goals

- **Writing & UX:** Readable type, sensible a11y (skip link, focus, contrast checks when changing accents), ~900–1,200-word posts unless a series dictates otherwise *(see Editorial)*.
- **Stack:** Hexo 8 + vendored **[Attila](https://github.com/zutrinken/hexo-theme-attila)-style** theme, Node **`engines`** in `package.json`; same **`lint`** + **`build`** in CI/Pages.

**Discovery & previews:** Canonical URL on every page; Open Graph + Twitter Card from **`open_graph`** and explicit **`twitter:title`** / **`twitter:description`**; post **`hero:`** (+ optional **`hero_width`**, **`hero_height`**, **`hero_alt`**) drives large-image previews. **Structured data:** **`BlogPosting`** (posts) and **`WebSite`** (sitewide) JSON-LD in theme partials. **Crawlers:** `robots` preview hints where supported; **`source/llms.txt`** → **`/llms.txt`**. **`themes/attila/_config.yml`:** **`google_analytics`** (GA4 **`G-…`** only, loaded in **`after-footer.ejs`**) and **`twitter_site`**.

**Installability:** Tracked **`source/manifest.json`**, **`themes/attila/source/service-worker.js`** (Workbox), **`pwacompat`** — lite “add to home screen”. Static + CDN is enough unless you explicitly need offline reading.

This file is the single map for humans and agents.

## Editorial guidelines

**Length.** ~**900–1,200 words** (~5 min read) as a soft target. Use `<!-- more -->` for excerpts on **non-series** posts unless you set **`excerpt:`** (below).

**Series: Influential music** — category **Influential music**, tag **`influential-music`**. Open with the **Jeff Tweedy / *World Within a Song*** acknowledgement, then the song hook. Filename: **`<band>-<song>.md`** (kebab-case); do **not** put the series slug in the filename.

**Teasers (required for this series).** For each post add **`excerpt:`** in front matter so listings are not identical. **When `excerpt:` is set, do not use `<!-- more -->`**. Arc: (1) scene/facts (2) the music (3) why it sticks.

**References.** Cite dates, charts, quotes, rights; one consistent style per post. Prefer credible sources; Wikipedia only with spot-checks; avoid unreliable forums for factual claims.

**Dictation.** Copy-desk pass (spelling/grammar/punctuation — not voice rewrites).

**Posts vs drafts.** **`source/_posts/`** shipped; **`source/_drafts/`** omitted from builds.

## Stack and commands

| Piece | Role |
|--------|------|
| [Hexo](https://hexo.io/) 8 | Generator |
| `themes/attila/` | Active theme (`theme:` in `_config.yml`) |
| Node | ≥ 20.19 per `package.json` **`engines`** |

```bash
npm install
npm run lint          # eslint + stylelint (theme)
npm run build         # → public/
npm run server        # local; `_config.local.yml` if present
npm run server:drafts # includes source/_drafts
```

**.github/workflows/hexo-build.yml** mirrors Pages: **`lint`** then **`build`**, dir **`public`**.

| Config | Purpose |
|--------|---------|
| `_config.yml` | Site **`url`**, **`root`**, permalinks |
| `_config.local.yml` | Local only — gitignored; see `_config.local.yml.example` |
| `themes/attila/_config.yml` | Menu, colors, **`google_analytics`**, **`twitter_site`**, etc. |

## Theme overrides

**CSS:** **`themes/attila/source/css/overrides.css`** — typography, clamp/gutters, skip link, category row, pagination, reduced-motion *(Attila uses `html { font-size: 62.5% }`; don’t set `html` to `100%` without rebasing `em`).*

**Head & metadata:** **`themes/attila/layout/_partial/head.ejs`** (+ **`structured-data-site.ejs`**, **`structured-data-post.ejs`**, **`google-analytics.ejs`**) — viewport/referrer/color-scheme, platform meta (PWA/App Store hints), **`msapplication-TileColor`**, favicon, feeds, manifests link.

**Post UI:** **`article.ejs`**, **`archive*.ejs`**, **`header.ejs`**.

**Dates:** **`themes/attila/scripts/date-helpers.js`** (generate-time relative phrases).

## Repository hygiene

`public/`, `node_modules/`, `db.json`, `.deploy_*`, **`_config.local.yml`** are gitignored. **`npm run lint && npm run build`** must pass locally, CI, and Pages.

**Optional:** `cd themes/attila && npm run version` — Grunt step for **`service-worker.js`** templating/version tag if you use it.

---

**Audience:** Maintainers and automation. Update when deploy mechanics, **`_config`**, or theme override behavior changes.
