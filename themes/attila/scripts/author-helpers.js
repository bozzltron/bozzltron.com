'use strict';

/**
 * Canonical site author string for YAML `author:` as string or
 * `{ nick?, default?, name? }`. Matches structured-data-post resolution order.
 */
hexo.extend.helper.register('author_display_name', function (cfg, fallback) {
  const fb = fallback == null ? '' : String(fallback).trim();
  if (!cfg || cfg.author === undefined || cfg.author === null || cfg.author === '') {
    return fb;
  }
  const a = cfg.author;
  if (typeof a !== 'object') return String(a).trim() || fb;
  const s = String(a.nick || a.default || a.name || '').trim();
  return s || fb;
});
