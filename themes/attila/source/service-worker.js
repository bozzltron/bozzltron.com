importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|webp|svg)$/,
  new workbox.strategies.CacheFirst({
    cacheName: 'images',
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
    cacheName: 'static-resources',
  })
);

workbox.routing.registerRoute(
  /\.(?:woff2)$/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'fonts',
  })
);

workbox.routing.registerRoute(
  // Third party png cache
  new RegExp('^https?://', 'i'),
  new workbox.strategies.NetworkFirst({
    cacheName: 'html',
    plugins: [
      new workbox.cacheableResponse.CacheableResponsePlugin({
        headers: {
          'Content-Type': 'text/html',
        }
      })
    ]
  })
);

workbox.routing.registerRoute(
  // Cache api requests if they return 200
  new RegExp('^https://widget.sndcdn.com', 'i'),
  new workbox.strategies.NetworkFirst({
    cacheName: 'sndcdn',
    plugins: [
      new workbox.cacheableResponse.CacheableResponsePlugin({
        statuses: [0, 200],
      })
    ]
  })
);
