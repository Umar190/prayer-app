const CACHE_NAME = "noor-v20-20260921";
const APP_SHELL = [
  "./",
  "./index.html",
  "./styles-v20.css?v=20",
  "./app-v20.js?v=20",
  "./manifest.webmanifest?v=20",
  "./icon.svg"
];
self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(APP_SHELL)).then(()=>self.skipWaiting()));
});
self.addEventListener("activate", event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  if (url.origin !== location.origin) return;
  event.respondWith(fetch(event.request).then(resp => {
    const copy = resp.clone();
    caches.open(CACHE_NAME).then(c => c.put(event.request, copy)).catch(()=>{});
    return resp;
  }).catch(()=>caches.match(event.request).then(r => r || caches.match("./index.html"))));
});
self.addEventListener("notificationclick", event => {
  event.notification.close();
  event.waitUntil(self.clients.matchAll({type:"window", includeUncontrolled:true}).then(list => {
    for (const c of list) if ("focus" in c) return c.focus();
    if (self.clients.openWindow) return self.clients.openWindow("./");
  }));
});
