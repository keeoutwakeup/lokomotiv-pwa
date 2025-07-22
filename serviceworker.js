const CACHE_NAME = 'loko-cache-v1';
const urlsToCache = [
  '/',
  '/HTMLPage1.html',
  '/HTMLPage2.html',
  '/HTMLPage3.html',
  '/StyleSheet1.css',
  '/lokologo.png',
  '/rzhdarena.jpg',
  '/video.mp4',
  '/gielerme.jpg',
  '/magkeev.jpg',
  '/barinov.jpg',
  '/tiknizyan.jpg',
  '/sochilogo.png',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});