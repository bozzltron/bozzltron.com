importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|webp|svg)$/,
  new workbox.strategies.CacheFirst({
    cacheName: 'images-brand-240430-a',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      }),
    ],
  })
);

workbox.routing.registerRoute(
  /\.(?:js|css|json)$/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'static-resources-brand-240430-a',
  })
);

workbox.routing.registerRoute(
  /\.(?:woff2)$/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'fonts',
  })
);

// Specific third-party origins must be registered before any broad matchers.
workbox.routing.registerRoute(
  new RegExp('^https://widget\\.sndcdn\\.com/', 'i'),
  new workbox.strategies.NetworkFirst({
    cacheName: 'sndcdn',
    plugins: [
      new workbox.cacheableResponse.CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);

// HTML documents only — the old ^https?:// pattern matched every cross-origin fetch
// and prevented the SoundCloud route from ever running.
workbox.routing.registerRoute(
  ({ request }) => request.mode === 'navigate',
  new workbox.strategies.NetworkFirst({
    cacheName: 'html',
    networkTimeoutSeconds: 3,
    plugins: [
      new workbox.cacheableResponse.CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);
