/* eslint-disable import/no-unresolved */
// @ts-ignore
import * as params from '@params';
import { setCacheNameDetails } from 'workbox-core';
import { registerRoute } from 'workbox-routing';
import {
  NetworkFirst,
  // StaleWhileRevalidate,
  CacheFirst,
} from 'workbox-strategies';
// Used for filtering matches based on status code, header, or both
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
// Used to limit entries in cache, remove entries after a certain period of time
import { ExpirationPlugin } from 'workbox-expiration';
import { precacheAndRoute } from 'workbox-precaching';

self.__WB_DISABLE_DEV_LOGS = true;

const prefix = 'the-handy-haversack';

setCacheNameDetails({
  prefix,
  // suffix: 'v1',
  // precache: 'custom-precache-name',
  // runtime: 'custom-runtime-name',
  // googleAnalytics: 'custom-google-analytics-name'
});

const assets = params.assets || [];

precacheAndRoute([
  // { url: params.home, revision: params.revision },
  // { url: '/inventory.html', revision: params.revision },
  ...assets.map((url: string) => ({ url, revision: null })),
]);

// Cache page navigations (html) with a Network First strategy
registerRoute(
  // Check to see if the request is a navigation to a new page
  ({ request }) => request.mode === 'navigate',
  // Use a Network First caching strategy
  new NetworkFirst({
    // Put all cached files in a cache named 'pages'
    cacheName: `${prefix}-pages`,
    networkTimeoutSeconds: 5,
    plugins: [
      // Ensure that only requests that result in a 200 status are cached
      new CacheableResponsePlugin({
        statuses: [200],
      }),
    ],
  }),
);

// Cache CSS, JS, and Web Worker requests with a Stale While Revalidate strategy
// registerRoute(
//   // Check to see if the request's destination is:
//   // - style for stylesheets
//   // - script for JavaScript
//   // - or worker for web worker
//   ({ request }) => request.destination === 'style'
//     || request.destination === 'script'
//     || request.destination === 'worker',
//   // Use a Stale While Revalidate caching strategy
//   new StaleWhileRevalidate({
//     // Put all cached files in a cache named 'assets'
//     cacheName: `${prefix}-assets`,
//     plugins: [
//       // Ensure that only requests that result in a 200 status are cached
//       new CacheableResponsePlugin({
//         statuses: [200],
//       }),
//     ],
//   }),
// );

// Cache images with a Cache First strategy
registerRoute(
  // Check to see if the request's destination is style for an image
  ({ request }) => request.destination === 'image',
  // Use a Cache First caching strategy
  new CacheFirst({
    // Put all cached files in a cache named 'images'
    cacheName: `${prefix}-images`,
    plugins: [
      // Ensure that only requests that result in a 200 status are cached
      new CacheableResponsePlugin({
        statuses: [200],
      }),
      // Don't cache more than 50 items, and expire them after 30 days
      new ExpirationPlugin({
        maxEntries: 250,
        maxAgeSeconds: 60 * 60 * 24 * 30, // 30 Days
        purgeOnQuotaError: true,
      }),
    ],
  }),
);

// Cache fonts with a Cache First strategy
registerRoute(
  // Check to see if the request's destination is for a font
  ({ request }) => request.destination === 'font',
  // Use a Cache First caching strategy
  new CacheFirst({
    // Put all cached files in a cache named 'fonts'
    cacheName: `${prefix}-fonts`,
    plugins: [
      // Ensure that only requests that result in a 200 status are cached
      new CacheableResponsePlugin({
        statuses: [200],
      }),
      // Don't cache more than 25 fonts, and expire them after 90 days
      new ExpirationPlugin({
        maxEntries: 25,
        maxAgeSeconds: 60 * 60 * 24 * 90, // 90 Days
        purgeOnQuotaError: true,
      }),
    ],
  }),
);
