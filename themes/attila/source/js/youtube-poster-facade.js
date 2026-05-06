/**
 * High-res poster for `.youtube-wrap` embeds: loads `i.ytimg.com/.../maxresdefault.jpg`
 * (fallback hq/mq) until the reader clicks, then sets the iframe src.
 * YouTube does not expose iframe parameters for preview/still image quality; see
 * https://developers.google.com/youtube/player_parameters
 *
 * Markup should use Privacy-Enhanced Mode (`youtube-nocookie.com`) per
 * https://support.google.com/youtube/answer/171780
 */
(function () {
  'use strict';

  var SEL_WRAP = '.post-content .youtube-wrap';
  var SEL_IFRAME = 'iframe[src*="youtube"]';

  /**
   * After an explicit play click, merge optional player parameters documented at
   * https://developers.google.com/youtube/player_parameters — preserves any
   * query string already in the post (e.g. start=, cc_load_policy=).
   * - autopoplay=1 — user gesture; avoids loading player until then (autoplay on
   *   page load has stronger privacy/data implications per that doc).
   * - playsinline=1 — inline playback on iOS where supported.
   * - rel=0 — same-channel related videos only (post–2018 `rel` behavior).
   */
  function finalizeEmbedUrl(raw) {
    try {
      var u = new URL(raw, window.location.href);
      if (!u.searchParams.has('autoplay')) u.searchParams.set('autoplay', '1');
      if (!u.searchParams.has('playsinline')) u.searchParams.set('playsinline', '1');
      if (!u.searchParams.has('rel')) u.searchParams.set('rel', '0');
      return u.toString();
    } catch (err) {
      var sep = raw.indexOf('?') === -1 ? '?' : '&';
      return raw + sep + 'autoplay=1&playsinline=1&rel=0';
    }
  }

  function extractEmbedId(src) {
    if (!src || typeof src !== 'string') return '';
    try {
      var u = new URL(src, window.location.href);
      var path = u.pathname || '';
      var m = path.match(/\/embed\/([^/?]+)/);
      return m && m[1] ? decodeURIComponent(m[1]) : '';
    } catch (e) {
      return '';
    }
  }

  function enhance(wrap) {
    if (!wrap || wrap.getAttribute('data-youtube-facade') === '1') return;
    var iframe = wrap.querySelector(SEL_IFRAME);
    if (!iframe) return;

    var originalSrc = (iframe.getAttribute('src') || '').trim();
    if (!originalSrc) return;

    var id = extractEmbedId(originalSrc);
    if (!id) return;

    wrap.setAttribute('data-youtube-facade', '1');

    iframe.removeAttribute('src');
    iframe.setAttribute('data-src', originalSrc);

    var title = (iframe.getAttribute('title') || '').trim();
    var label = title ? 'Play video — ' + title : 'Play embedded YouTube video';

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'youtube-poster-facade';
    btn.setAttribute('aria-label', label);

    var img = document.createElement('img');
    img.alt = '';
    img.loading = 'lazy';
    img.decoding = 'async';
    img.width = 1280;
    img.height = 720;
    img.src = 'https://i.ytimg.com/vi/' + encodeURIComponent(id) + '/maxresdefault.jpg';
    img.addEventListener('error', function onImgErr() {
      if (img.src.indexOf('hqdefault') === -1) {
        img.src = 'https://i.ytimg.com/vi/' + encodeURIComponent(id) + '/hqdefault.jpg';
      } else if (img.src.indexOf('mqdefault') === -1) {
        img.src = 'https://i.ytimg.com/vi/' + encodeURIComponent(id) + '/mqdefault.jpg';
      } else {
        img.removeEventListener('error', onImgErr);
      }
    });

    var play = document.createElement('span');
    play.className = 'youtube-poster-facade__play';
    play.setAttribute('aria-hidden', 'true');

    btn.appendChild(img);
    btn.appendChild(play);
    wrap.insertBefore(btn, wrap.firstChild);

    function activate() {
      var raw = iframe.getAttribute('data-src');
      if (!raw) return;
      iframe.setAttribute('src', finalizeEmbedUrl(raw));
      iframe.removeAttribute('data-src');
      btn.remove();
      wrap.removeAttribute('data-youtube-facade');
      try {
        iframe.focus({ preventScroll: true });
      } catch (eFocus) {
        /* ignore */
      }
    }

    btn.addEventListener('click', activate);
    btn.addEventListener('keydown', function (ev) {
      if (ev.key === 'Enter' || ev.key === ' ') {
        ev.preventDefault();
        activate();
      }
    });
  }

  function run() {
    document.querySelectorAll(SEL_WRAP).forEach(enhance);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
