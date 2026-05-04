/**
 * Light / dark / Auto (system + site default) for Attila.
 * Expects <html data-server-scheme="system|light|dark"> from head.ejs.
 */
(function () {
  var root = document.documentElement;
  var LS_KEY = 'attila_color_scheme';

  var server = (root.getAttribute('data-server-scheme') || 'system').toLowerCase();
  if (server !== 'light' && server !== 'dark' && server !== 'system') {
    server = 'system';
  }

  function storedChoice() {
    try {
      var s = localStorage.getItem(LS_KEY);
      if (s === 'light' || s === 'dark' || s === 'system') {
        return s;
      }
    } catch (err) { /* ignore */ }
    return null;
  }

  function effectiveMode() {
    var stored = storedChoice();
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }
    return server;
  }

  function repaint(mode) {
    root.classList.remove('theme-dark', 'theme-light');
    if (mode === 'dark') {
      root.classList.add('theme-dark');
    } else if (mode === 'light') {
      root.classList.add('theme-light');
    } else {
      var dark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.classList.add(dark ? 'theme-dark' : 'theme-light');
    }
  }

  function applyFromPrefs() {
    var m = effectiveMode();
    if (m === 'system') {
      repaint('system');
    } else {
      repaint(m);
    }
  }

  function uiActiveChoice() {
    var s = storedChoice();
    if (s === 'light' || s === 'dark') {
      return s;
    }
    return 'system';
  }

  function syncPicker() {
    var picker = document.getElementById('theme-scheme-picker');
    if (!picker) {
      return;
    }
    var active = uiActiveChoice();
    var btns = picker.querySelectorAll('[data-theme-choice]');
    for (var i = 0; i < btns.length; i++) {
      var btn = btns[i];
      var ch = btn.getAttribute('data-theme-choice');
      var on = ch === active;
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
      btn.classList.toggle('theme-scheme-btn--active', on);
    }
  }

  window.attilaSetColorScheme = function (choice) {
    try {
      if (choice === 'system') {
        localStorage.removeItem(LS_KEY);
      } else if (choice === 'light' || choice === 'dark') {
        localStorage.setItem(LS_KEY, choice);
      } else {
        return;
      }
    } catch (err) { /* ignore */ }
    applyFromPrefs();
    syncPicker();
  };

  var mql = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
  function onOsSchemeChange() {
    if (effectiveMode() !== 'system') {
      return;
    }
    applyFromPrefs();
    syncPicker();
  }
  if (mql && mql.addEventListener) {
    mql.addEventListener('change', onOsSchemeChange);
  }

  applyFromPrefs();

  document.addEventListener('DOMContentLoaded', function () {
    var picker = document.getElementById('theme-scheme-picker');
    if (!picker) {
      return;
    }
    syncPicker();
    picker.addEventListener('click', function (ev) {
      var t = ev.target;
      if (!t || !t.getAttribute) {
        return;
      }
      var ch = t.getAttribute('data-theme-choice');
      if (ch === 'system' || ch === 'light' || ch === 'dark') {
        window.attilaSetColorScheme(ch);
      }
    });
  });
})();
