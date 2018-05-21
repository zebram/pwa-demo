var dynamicCache = 'pwa-dynamic';
var staticCache = 'pwa-static';
var filesToCache = [
    './',
    './index.html',
    './app.js',
    './style.css',
];

self.addEventListener('install', e => {
  console.log('sw installed');
  e.waitUntil(
    caches.open(staticCache).then(cache => {
      console.log('caches app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('fetch', e => {
  console.log('fetch');
  const req = e.request;
  const url = new URL(req.url);

  if(url.origin === location.origin) {
    e.respondWith(cacheFirst(req));
  } else {
    e.respondWith(networkFirst(req));
  }
});

async function cacheFirst(req) {
  console.log('cacheFirst');
  const cachedResponse = await caches.match(req);
  return cachedResponse || fetch(req);
}

async function networkFirst(req) {
  console.log('networkdFirst');
  const cache = await caches.open(dynamicCache);

  try {
    const res = await fetch(req);
    cache.put(req, res.clone());
    return res;
  } catch(error) {
    return await cache.match(req);
  }
}
