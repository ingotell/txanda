const CACHE='txanda-v3';
const FILES=['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png'];
/* Se cachea archivo a archivo: si uno falla, el resto sigue y el SW se instala igual. */
self.addEventListener('install',e=>{
  e.waitUntil(
    caches.open(CACHE)
      .then(c=>Promise.all(FILES.map(f=>c.add(f).catch(()=>null))))
      .then(()=>self.skipWaiting())
  );
});
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys()
    .then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k))))
    .then(()=>self.clients.claim()));
});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET') return;
  e.respondWith(
    fetch(e.request).then(r=>{
      if(r.ok && e.request.url.startsWith(self.location.origin)){
        const cp=r.clone(); caches.open(CACHE).then(c=>c.put(e.request,cp));
      }
      return r;
    }).catch(()=>caches.match(e.request).then(m=>m||caches.match('./index.html')))
  );
});
