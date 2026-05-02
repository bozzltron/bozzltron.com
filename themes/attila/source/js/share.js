(function () {
  function copyToClipboard(text) {
    if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
      return navigator.clipboard.writeText(text);
    }
    return new Promise(function (resolve, reject) {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      try {
        if (document.execCommand('copy')) resolve();
        else reject(new Error('execCommand failed'));
      } catch (e) {
        reject(e);
      }
      document.body.removeChild(ta);
    });
  }

  function clipPayload(url, text) {
    var t = (text || '').trim();
    if (t && url) return t + '\n\n' + url;
    return url || t || '';
  }

  function feedback(btn, key) {
    var label = btn.querySelector('.share-action-label');
    if (!label) return;
    var map = {
      default: btn.getAttribute('data-label-default') || label.textContent,
      copied: btn.getAttribute('data-label-copied'),
      failed: btn.getAttribute('data-label-failed')
    };
    var next = map[key] || map.default;
    label.textContent = next;
    clearTimeout(btn.__shareFeedbackT);
    if (key !== 'default') {
      btn.__shareFeedbackT = setTimeout(function () {
        label.textContent = map.default;
      }, 2200);
    }
  }

  function onClick(btn) {
    var url = (btn.getAttribute('data-share-url') || '').trim() || window.location.href;
    var title = (btn.getAttribute('data-share-title') || '').trim() || document.title;
    var text = (btn.getAttribute('data-share-text') || '').trim();

    if (navigator.share) {
      navigator
        .share({
          title: title,
          text: text || title,
          url: url
        })
        .catch(function (err) {
          if (err && err.name === 'AbortError') return;
          copyToClipboard(clipPayload(url, text))
            .then(function () {
              feedback(btn, 'copied');
            })
            .catch(function () {
              feedback(btn, 'failed');
            });
        });
      return;
    }

    copyToClipboard(clipPayload(url, text))
      .then(function () {
        feedback(btn, 'copied');
      })
      .catch(function () {
        feedback(btn, 'failed');
      });
  }

  document.querySelectorAll('button.share-action').forEach(function (btn) {
    btn.addEventListener('click', function () {
      onClick(btn);
    });
  });
})();
