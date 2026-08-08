const CACHE_NAME = 'kavalkaran-v1';

// Add the exact file paths you want accessible offline
const ASSETS = [
  '/',
  '/index.html',
  '/dashboard.html',
  '/css/style.css',
  '/app.js',
  '/images/logo.png',
  '/images/bg.jpg',
  '/icon/favicon.ico',
  '/manifest.json'
];

// 1. Install Event - Caches all core assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Caching core application shell assets');
        return cache.addAll(ASSETS);
      })
      .then(() => self.skipWaiting()) // Forces activation immediately
  );
});

// 2. Activate Event - Cleans up old cache versions
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('Clearing old service worker cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim()) // Takes control of open pages immediately
  );
});

// 3. Fetch Event - Serves files from cache or falls back to network
self.addEventListener('fetch', (event) => {
  // Only handle standard http/https requests (prevents chrome-extension errors)
  if (!event.request.url.startsWith(self.location.origin)) return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse; // Return cached file if found
      }
      return fetch(event.request); // Otherwise fetch from the web
    })
  );
});
