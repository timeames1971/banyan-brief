const CACHE = 'banyan-brief-v2.3.3';
const ASSETS = [
  '/banyan-brief/',
  '/banyan-brief/index.html',
  '/banyan-brief/manifest.json',
  '/banyan-brief/banyan-icon-master.png',
  '/banyan-brief/icon-192.png',
  '/banyan-brief/icon-512.png',
  '/banyan-brief/icon-maskable-512.png',
  '/banyan-brief/apple-touch-icon.png',
  '/banyan-brief/favicon-96.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
