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

### Excerpts

- **Length:** ~**900–1,200 words**; **`<!-- more -->`** for excerpts unless **`excerpt:`** is set.
- **Series “Influential music”:** category **Influential music**, tag **`influential-music`**; filename **`<band>-<song>.md`**; Tweedy acknowledgement + **`excerpt:`** (no **`<!-- more -->`** when excerpt is set). Use **verbatim** sentences from the post body, not a separate paraphrase (listings, **`og:description`**, and share dialogs pull from **`excerpt:`**).

### Link preview (Open Graph / Twitter / etc.)

Posts pick up social cards from front matter; crawlers need an **absolute** image URL, which depends on root **`_config.yml`** **`url`** matching production (e.g. `https://www.bozzltron.com`).

- **`hero`:** Path served as **`/images/…`** (asset in **`themes/attila/source/images/`** or site **`source/images/`** so the build copies it into **`public/images/`**).
- **`hero_width`** / **`hero_height`:** Pixel dimensions of that file (enables **`og:image:width`** / **`og:image:height`**).
- **`hero_alt`:** Short accessible description of the image (also **`og:image:alt`** and **`twitter:image:alt`**). **`hero_title`** is the on-page caption under the hero.

With **`hero`** set, the theme emits **`og:image`**, **`og:image:secure_url`**, **`og:image:type`**, **`twitter:card`** (**`summary_large_image`**), **`twitter:image`**, plus alt and size metadata when dimensions exist. JSON-LD **`BlogPosting`** **`image`** uses the same URL.

If a preview looks wrong after deploy, the platform may be serving a cached scrape; use that platform’s sharing debugger or “fetch again” tool after the live **`url` + image** both resolve.

### Other

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
