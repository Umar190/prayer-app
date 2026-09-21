const CACHE_NAME = "noor-v29-20260921";
const APP_SHELL = [
  "./", "./index.html", "./styles-v29.css?v=29", "./app-v29.js?v=29", "./manifest.webmanifest", "./icon.svg",
  "./privacy.html", "./terms.html"
];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(APP_SHELL)).then(()=>self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(fetch(e.request).then(r => {
    const copy=r.clone(); caches.open(CACHE_NAME).then(c=>c.put(e.request,copy)).catch(()=>{}); return r;
  }).catch(()=>caches.match(e.request).then(r=>r || caches.match("./index.html"))));
});
