const CACHE="exp5-lab-v3-25f9c48987";const CORE=["./","./index.html","./assets/app.e9bb774208.js","./assets/styles.d13d49bb1f.css","./assets/bootstrap.js","./icon.svg","./manifest.webmanifest","./assets/icon-192.png","./assets/icon-512.png"];
self.addEventListener("install",event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(CORE)).then(()=>self.skipWaiting())));
self.addEventListener("activate",event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith("exp5-lab-")&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",event=>{if(event.request.method!=="GET"||new URL(event.request.url).origin!==self.location.origin)return;
if(event.request.mode==="navigate"){event.respondWith((async()=>{try{const response=await fetch(event.request,{signal:AbortSignal.timeout(4000)});if(response.ok){const cache=await caches.open(CACHE);cache.put(event.request,response.clone());}return response;}catch(e){return await caches.match(event.request)||await caches.match("./index.html")||Response.error();}})());return;}
event.respondWith(caches.match(event.request).then(hit=>hit||fetch(event.request).then(response=>{if(response.ok){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy));}return response;})));
});
