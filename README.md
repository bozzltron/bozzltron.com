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

- **Length:** ~**900–1,200 words**; **`<!-- more -->`** for excerpts unless **`excerpt:`** is set.
- **Series “Influential music”:** category **Influential music**, tag **`influential-music`**; filename **`<band>-<song>.md`**; Tweedy acknowledgement + **`excerpt:`** (no **`<!-- more -->`** when excerpt is set).
- **References:** cite sources; hero images: credit + original URL + local derivative path when applicable.
- **Drafts:** **`source/_drafts/`** excluded from production builds unless **`--draft`**.

## Theme overrides (where to edit)

| Area | Path |
|------|------|
| Typography, a11y, dark surfaces, footer, theme picker | **`themes/attila/source/css/overrides.css`** |
| Head, canonical, OG, JSON-LD | **`themes/attila/layout/_partial/head.ejs`** (+ structured-data partials) |
| Post chrome, author avatar | **`themes/attila/layout/_partial/article.ejs`** |
| OG **`article:*`** behavior | **`themes/attila/scripts/open-graph-override.js`** |
| Bundled post images / heroes | **`themes/attila/source/images/`** → **`/images/…`** |

**Avatar:** **`themes/attila/_config.yml`** **`avatar`** (path under **`/images/…`**). Bump **`avatar_cache_bust`** when replacing the file so browsers refetch **`author-profile-image`**.

## Hygiene

**`public/`**, **`node_modules/`**, **`db.json`**, **`_config.local.yml`** are gitignored. **`npm run lint && npm run build`** must pass locally, in CI, and on Pages.

---

**Audience:** Maintainers and automation. Update when deploy paths, **`_config`**, or theme behavior changes.
