/**
 * High-res poster for `.youtube-wrap` embeds: loads `i.ytimg.com/.../maxresdefault.jpg`
 * (fallback hq/mq) until the reader clicks, then sets the iframe src (optional autoplay).
 * YouTube iframe embeds do not support configuring preview thumbnail quality.
 */
(function () {
  'use strict';

  var SEL_WRAP = '.post-content .youtube-wrap';
  var SEL_IFRAME = 'iframe[src*="youtube"]';

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
      try {
        var u = new URL(raw, window.location.href);
        if (!u.searchParams.has('autoplay')) u.searchParams.set('autoplay', '1');
        iframe.setAttribute('src', u.toString());
      } catch (err) {
        iframe.setAttribute('src', raw + (raw.indexOf('?') === -1 ? '?' : '&') + 'autoplay=1');
      }
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
