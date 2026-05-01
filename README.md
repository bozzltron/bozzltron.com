# bozzltron.com

Personal site and blog, published at [bozzltron.com](https://bozzltron.com). Posts live in Markdown; the static HTML is produced at build time. Production hosting is **[Cloudflare Pages](https://pages.cloudflare.com/)**: builds run from this Git repository; publish the **`public/`** output and match the commands below in the Pages project settings.

## Goals

- **Readable, low-friction reading** — Comfortable typography on phones and desktops, sane defaults for light/dark, and tooling that prefers standards (semantic HTML landmarks, keyboard paths, scalable type).
- **Small, maintainable stack** — Hexo generates the site from `source/_posts`; the theme stays close to upstream [Attila](https://github.com/zutrinken/hexo-theme-attila)-style markup with deliberate overrides documented below.
- **Human and agent onboarding** — This file is the canonical map of repo layout and editorial decisions.

## Stack

| Piece | Role |
|--------|------|
| [Hexo](https://hexo.io/) 8 | Static generator |
| Theme `themes/attila/` | Hexo-compatible Attila-derived layout, CSS, and scripts |
| Node.js | See `engines` in `package.json` (currently ≥ 20.19) |

`theme:` in `_config.yml` is `attila` (forked/vendor copy under `themes/attila/`).

### Install and build

```bash
npm install
npm run lint     # eslint + stylelint on theme-owned sources (see package.json)
npm run build    # writes to public/
npm run server   # local preview; merges _config.local.yml if present
npm run server:drafts   # same, but includes source/_drafts (not published until moved)
```

GitHub Actions runs **`npm run lint`** then **`npm run build`** on every push and pull request (`.github/workflows/hexo-build.yml`). In the Cloudflare Pages dashboard, use the **same build command** (**`npm run lint && npm run build`**) and set the build output directory to **`public`**, so production cannot ship lint failures while only GitHub is enforcing checks.

### Configuration

| File | Notes |
|------|--------|
| `_config.yml` | Site metadata, permalink shape, pagination, generators, **`url`** and **`root`**. Paths like `/css/...` in the theme assume `root` is `/`; subdirectory deploys must align `root` **and** those asset paths if you relocate the site. |
| `_config.local.yml` | Local overlay for **`hexo server`** (URLs, ports). **Not committed.** Start from **`_config.local.yml.example`** and copy — never paste deploy tokens here if you recreate the repo without ignore rules. |
| `_config.local.yml.example` | Short template checked in for onboarding; copy to **`_config.local.yml`**. |
| `themes/attila/_config.yml` | Theme options: menu labels, avatar, accents, excerpt link, accent colors |

## Typography and readable font sizing

**Standards-aligned expectations**

- **[WCAG 1.4.4 Resize text](https://www.w3.org/WAI/WCAG22/Understanding/resize-text/)** expects text can scale to **200%** without loss of functionality or undue horizontal scrolling in typical reading layouts. **It does not prescribe a minimum body font height in px.**
- **[WCAG 1.4.12 Text spacing](https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html)** describes test thresholds for author-set spacing, including **line-height at least ~1.5** for blocks of text when spacing is authored. Many readable themes combine **solid line-height** with **moderate** point sizes rather than maximizing font size alone.

**Industry / platform shorthand (guardrails — still verify devices and zoom)**

| Source | Takeaway |
|--------|----------|
| [Material design typography](https://m3.material.io/styles/typography/overview) | **Modular scale** from body upward; readable body roles anchored near common defaults, not arbitrary one-off sizing. |
| [Apple Typography (HIG)](https://developer.apple.com/design/human-interface-guidelines/typography) | Design for **legible hierarchies** and systems that tolerate user text-size preferences (on web: **respect zoom** and UA defaults). |
| Long-form web / publications | Paragraph **upper-teens through low twenties px-equivalent** for continuous reading is widespread for serif prose; breakpoints and UI chrome shift the precise number |

**What this repo implements**

Attila keeps **`html { font-size: 62.5% }`**. **`body { font-size: 1.125em }`** and **`.post-content { font-size: 1.95em }`** (over Attila’s **`1.75em`**) live in **`themes/attila/source/css/overrides.css`** so continuous reading settles around **the low twenties in px-equivalent** at a **16px** UA root, without editing minified **`style.css`**. Nudge **`body`** if chrome feels small, **`.post-content`** alone if headings look undersized beside paragraphs.

**Important:** resetting **`html`** to **`font-size: 100%`** without rebalancing nested **`em`/`rem`** in **`style.css`** skews proportions; prefer **`body` / `.post-content`** tweaks in **`overrides.css`** (see comments at top of that file).

### Dates and “relative” time

Friendly date strings plus a “relative” phrase (for example “two days ago”) are resolved **at Hexo generate time** via Moment in `themes/attila/scripts/date-helpers.js`, not refreshed in the browser. Re-deploy to refresh them.

### Optional third-party scripts

Google Analytics loads from `themes/attila/layout/_partial/google-analytics.ejs` only when configured. Disqus and similar blocks are guarded in templates (comments section off until enabled).

## Accessibility

What we prioritize and verify:

- **Bypass block** — “Skip to main content” (`layout.ejs` + `#main-content` on `<main>` in article and archive partials).
- **Landmarks** — One primary `<main id="main-content">` per page layout; `<nav aria-label="Primary">`; footer `<nav aria-label="Footer">`.
- **Pagination** — Separate `aria-label`s for the “page X of Y” strip vs the link pager so screen readers distinguish summary from controls.
- **Focus** — Category chips already use `:focus-visible` in `overrides.css`; skip link adopts a high-contrast focus treatment.
- **Motion** — `prefers-reduced-motion` removes chip transitions (`overrides.css`); enlarge if new animated surfaces appear.
- **Heading sanity** — Post **author line** uses `<p class="post-meta-author">` so the outline isn’t polluted by an `h4` between title and article body.

**Recommended manual checks**

- Tab from page load → skip link → enter main landmark.
- 200% browser zoom on a long article and on the homepage list.
- Color contrast if changing `--ghost-accent-color` / dark accent in theme config.

Automated scanners (axe, Lighthouse) on generated `public/*.html` are useful before deploy.

## Responsive design

**Baseline (theme):** **`width=device-width`** viewport (`themes/attila/layout/_partial/head.ejs`); **`html`** / **`body`** avoid horizontal bleed in Attila. Main breakpoint **`640px`**: stacked nav drawer, **`inner`** gutters **`padding: 0 4rem`**. **`480px`**: hyphenation aids on **`post-title`**, tighter pagination labeling.

**Site overrides (`overrides.css`):** **`clamp()`** typography for **`blog-name`**, **`.post-header .post-title`**, listing titles, and **`blog-description`** below **`640px`** so long lines reflow inside the viewport. Below **`480px`**, **`page-wrapper .inner`** gutters and mobile-menu link padding scale down from the theme **`4rem`** defaults so layouts breathe on **`~320–390px`** widths. Article tables already scroll sideways under **`640px`** in the bundled theme CSS.

Manual spot checks: home + paginator, longest post title / category row, hero image post, rotated phone, soft keyboard shrinking the viewport.

## Theme customization map (for editors and agents)

| Path | Purpose |
|------|---------|
| `themes/attila/source/css/overrides.css` | Site overrides; typography, responsive **clamp**/gutters, skip link, category row, pagination, motion |
| `themes/attila/scripts/date-helpers.js` | Registers **`readable_date`** and **`time_ago`** Moment helpers (`fromNow()` at generate time) |
| `themes/attila/layout/_partial/article.ejs` | Post/article shell, hero, tags, adjacent post nav |
| `themes/attila/layout/_partial/archive.ejs` | Index / archive / paginated listings |
| `themes/attila/layout/_partial/header.ejs` | Primary nav driven by theme menu |
| `themes/attila/layout/_partial/head.ejs` | Meta, OG, accent CSS variables, font preconnect |
| `source/_posts/` | Markdown posts |
| `_config.yml` | Site-level Hexo |

When adding features, mirror existing patterns (`url_for()`, theme fallbacks from `Hexo`/locale helpers) so subdirectory deploy and i18n keep working.

## Repository hygiene

- **Gitignore** — `public/`, `node_modules/`, `db.json`, Hexo `.deploy*` folders, Amplify client artifacts (if used), and **`_config.local.yml`** belong out of git. **`_config.local.yml.example`** documents the minimal local overlay (`url`/`port`).
- **`_config.local.yml`** — Keep on disk for `npm run server` but **never commit**; it was mistakenly tracked historically—removed from the index with `git rm --cached _config.local.yml` once `.gitignore` lists it.

- **Theme scope** — Only `themes/attila` is wired; a historical full-tree copy **`themes/attila-backup/`** was removed (recover from git if needed).
- **Pruned dormant layout** — Sidebar, widgets (`layout/_widget/`), Ghost HTML templates (`template-*.html`), unused post partials (`post/nav`, `post/gallery`), and a duplicate root `after-footer.ejs` were removed; nothing referenced them from `layout.ejs` or layouts.
- **Dependencies** — `hexo-theme-landscape` and `hexo-renderer-stylus` were dropped (no `.styl` sources in this repo).
- **Build verification** — `npm run lint && npm run build` must succeed locally, in CI, and in the **Cloudflare Pages** production build before relying on publish automation.

### Optional: regenerate service-worker hash

Theme **`npm run version`** (`themes/attila/` Grunt) stamps git hash into `service-worker.js` from `service-worker-template.js`. Run before deploy only if that workflow matters for your CDN.

---

**Audience:** Humans maintaining the blog + automation that needs repo context. Prefer updating this README when behavior of `_config.yml`, theme overrides, or deploy assumptions changes materially.
