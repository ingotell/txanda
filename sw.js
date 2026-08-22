/* Txanda 2026 — service worker
   Sube la versión al publicar cambios: fuerza la limpieza de la caché anterior. */
const VERSION = 'txanda-v1';
const ESENCIALES = ['./', './index.html', './manifest.json', './icon-192.png', './icon-512.png'];

/* Instalación: guarda lo imprescindible para funcionar sin cobertura. */
self.addEventListener('install', ev => {
  ev.waitUntil(
    caches.open(VERSION)
      .then(c => c.addAll(ESENCIALES))
      .catch(() => {})            // si algo falla, la app sigue funcionando por red
      .then(() => self.skipWaiting())
  );
});

/* Activación: borra versiones antiguas y toma el control sin esperar a cerrar pestañas. */
self.addEventListener('activate', ev => {
  ev.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', ev => {
  const req = ev.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;   // fuentes de Google: las gestiona el navegador

  /* Navegación y HTML: primero la red, para que una versión nueva llegue siempre.
     Sin cobertura, se sirve la copia guardada. */
  if (req.mode === 'navigate' || (req.headers.get('accept') || '').includes('text/html')) {
    ev.respondWith(
      fetch(req)
        .then(res => {
          const copia = res.clone();
          caches.open(VERSION).then(c => c.put(req, copia)).catch(() => {});
          return res;
        })
        .catch(() => caches.match(req).then(r => r || caches.match('./index.html')))
    );
    return;
  }

  /* Iconos y manifest: primero la caché, que no cambian casi nunca. */
  ev.respondWith(
    caches.match(req).then(r => r || fetch(req).then(res => {
      if (res && res.status === 200) {
        const copia = res.clone();
        caches.open(VERSION).then(c => c.put(req, copia)).catch(() => {});
      }
      return res;
    }))
  );
});

/* Al tocar el aviso: abre la app si ya está abierta, o la lanza. */
self.addEventListener('notificationclick', ev => {
  ev.notification.close();
  ev.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(lista => {
      for (const c of lista) if ('focus' in c) return c.focus();
      if (self.clients.openWindow) return self.clients.openWindow('./');
    })
  );
});
