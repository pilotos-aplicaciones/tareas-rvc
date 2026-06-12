// Service Worker — Tareas RVC
// Solo hace que la app sea instalable como PWA. No cachea offline.
const VERSION = 'tareas-rvc-v1';

self.addEventListener('install', e => {
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Fetch: siempre desde la red (no offline), solo necesario para que Chrome lo acepte como PWA
self.addEventListener('fetch', e => {
  e.respondWith(fetch(e.request).catch(() => new Response('Sin conexión', {status: 503})));
});
