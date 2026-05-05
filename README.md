# bozzltron.com

Personal blog ([www.bozzltron.com](https://www.bozzltron.com)): Markdown in **`source/`** → Hexo → static **`public/`**. Deploy on **[Cloudflare Pages](https://pages.cloudflare.com/)** with **`npm run lint && npm run build`**, publishing **`public/`**.

## Stack

| Piece | Role |
|--------|------|
| [Hexo](https://hexo.io/) 8 | Static generator |
| **`themes/attila/`** | Theme (`theme:` in **`_config.yml`**) |
| Node | ≥ **20.19** (`package.json` **`engines`**) |

```bash
npm install
npm run lint          # eslint + stylelint (theme)
npm run build         # → public/
npm run server        # local; optional _config.local.yml
npm run server:drafts # includes source/_drafts
```

**CI:** `.github/workflows/hexo-build.yml` — **lint** then **build**, output **`public/`**.

**Config:** **`_config.yml`** (site **`url`**, feeds); **`_config.local.yml`** (local only, gitignored); **`themes/attila/_config.yml`** (nav, accents, **`color_scheme`**, **`avatar`**, analytics).

## Light and dark mode

- **Reader choice:** footer **Auto** (default: match OS when **`color_scheme: system`**), **Light**, or **Dark**. Preference is stored in **`localStorage`** (`attila_color_scheme`; cleared for Auto). **Auto** follows **`prefers-color-scheme`** while the effective mode is **system**.
- **Site default:** **`themes/attila/_config.yml`** **`color_scheme`**: **`system`** | **`light`** | **`dark`** (used when the reader has not forced Light/Dark).
- **Implementation:** **`themes/attila/source/js/theme-scheme.js`**, **`data-server-scheme`** on **`<html>`** in **`head.ejs`**, overrides in **`overrides.css`**. **`meta name="color-scheme"`** and **`<meta name="theme-color" media="(prefers-color-scheme: …)">`** stay in **`head.ejs`**.

## Editorial

### Before publishing

1. **Spelling and grammar** — read aloud or pass through an editor; fix typos and clunky sentences. For a **voice-preserving** structured pass (scope boundaries, journalistic defaults, **clean edit + change log** for assistants), use **`docs/blog-copy-editing.md`**.
2. **Reference quality** — every substantive claim that needs one has a source; hero art has credit, source URL, and local path called out where applicable.
3. **Fact check** — names, dates, numbers, chart/certification claims, and quotes match the sources.
4. **Meta** — **`title`**, **`date`**, category/tags; **`hero`** + **`hero_width`** / **`hero_height`** + **`hero_alt`** when the post should unfurl with an image; root **`_config.yml`** **`url`** matches production. **Title** and **excerpt** should read well as the tab label and as the search/social snippet (excerpt feeds **`meta`/`og` description** unless you set **`description:`** separately).
5. **URLs** — outbound links open and point at the right place; no accidental `localhost` or broken anchors.
6. **Excerpt** — **`excerpt:`** (or **`<!-- more -->`**) is **verbatim** from the post body, not a new summary.
7. **Build** — **`npm run lint && npm run build`** passes; new images show up under **`public/images/`** after generate.
8. **Accessibility** — sensible heading order; link text that stands on its own; **`hero_alt`** matches the hero; embeds (e.g. YouTube) have a descriptive **`title`** on the iframe.
9. **Web Share** — on the built post, **Share** uses **`navigator.share`** where supported (**`url`** + **`title`**; no body **`text`** on posts—link previews use **`og:description`**). Tag pages may still pass a short blurb. Clipboard fallback copies **URL** only when **`text`** is empty. Re-check after **`permalink`** or **`share-toolbar`** changes.

### Length and series

- ~**900–1,200 words**; **`<!-- more -->`** unless **`excerpt:`** is set.
- **Influential music:** category **Influential music**, tag **`influential-music`**, filename **`<band>-<song>.md`**, Tweedy acknowledgement, **`excerpt:`** (no **`<!-- more -->`** when using it).

### Link preview (detail)

Crawlers resolve **`og:image`** from **`full_url_for`**, so production **`url`** must be correct. After deploy, if a card is stale, use the platform’s “scrape again” / debugger. Theme tags: **`og:image`**, **`og:image:secure_url`**, **`og:image:type`**, dimensions, alt, **`twitter:card`** (**`summary_large_image`**), **`twitter:image`**, **`twitter:image:alt`**.

### Other

- **Drafts:** **`source/_drafts/`** excluded from production unless **`--draft`**.

## Theme overrides (where to edit)

| Area | Path |
|------|------|
| Typography, a11y, dark surfaces, footer, theme picker | **`themes/attila/source/css/overrides.css`** |
| Head, canonical, OG, JSON-LD | **`themes/attila/layout/_partial/head.ejs`** (+ structured-data partials) |
| Post chrome, author avatar | **`themes/attila/layout/_partial/article.ejs`** |
| Share (**`navigator.share`**, clipboard fallback) | **`themes/attila/layout/_partial/share-toolbar.ejs`**, **`themes/attila/source/js/share.js`** |
| OG **`article:*`** behavior | **`themes/attila/scripts/open-graph-override.js`** |
| Bundled post images / heroes | **`themes/attila/source/images/`** → **`/images/…`** |

**Avatar:** **`themes/attila/_config.yml`** **`avatar`** (path under **`/images/…`**). Bump **`avatar_cache_bust`** when replacing the file so browsers refetch **`author-profile-image`**.

## Hygiene

**`public/`**, **`node_modules/`**, **`db.json`**, **`_config.local.yml`** are gitignored. **`npm run lint && npm run build`** must pass locally, in CI, and on Pages.

---

**Audience:** Maintainers and automation. Update when deploy paths, **`_config`**, or theme behavior changes.
