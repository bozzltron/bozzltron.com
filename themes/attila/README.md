# bozzltron Hexo theme (Ghost Attila–inspired)

This is **not** the Ghost theme package. It is a **Hexo-first** customization that aligns layout and styling with [**zutrinken/attila**](https://github.com/zutrinken/attila) (Ghost), currently tracked against upstream **Attila ~3.9.x** (`package.json` in that repo: `3.9.0`, Ghost `>=5`).

Upstream Attila remains **maintained**. Re-sync periodically by diffing Ghost’s shipped assets:

| Ghost (clone / release zip) | This theme |
|---|---|
| `assets/css/style.css` | `source/css/style.css` |
| `assets/js/script.js` | `source/js/script.js` |
| Typography from Ghost `@site` / Portal | Self-hosted **`source/css/fonts-icons.css`** (Cardo, Fira Sans, icon font) loaded before Attila CSS |
| — | **`source/css/overrides.css`** — Hexo-specific tweaks (not from Ghost); keep when re-syncing `style.css` |

Configurable in **`themes/attila/_config.yml`** (`accent_color`, `darkmode_accent_color`, `color_scheme`, `avatar`, **`avatar_cache_bust`**, menus, RSS). **Color theme:** **`js/theme-scheme.js`** (early in **`head.ejs`**) reads **`data-server-scheme`** on **`<html>`** and optional reader override in **`localStorage`** key **`attila_color_scheme`** (`light` / `dark`; omit = Auto). Footer **Auto / Light / Dark** updates storage and listens for **`prefers-color-scheme`** when the effective mode is **system**. **`source/js/pwacompat.min.js`** is a vendored **`pwacompat`** build (no CDN) loaded from **`head`**. **`layout/layout.ejs`** disables Hexo **`partial`** caching on **`header`** / **`footer`** so **`active`** menu classes reflect each page. For site-wide Hexo overrides without editing this repo, prefer the site root **`_config.attila.yml`** ([alternate theme config](https://hexo.io/docs/configuration#Alternate-Theme-Config)).

Theme build step (`npm run version`) only refreshes **`service-worker.js`** from template + git revision; CSS/JS are vendored intentionally.
