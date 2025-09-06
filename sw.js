self.addEventListener('install', event =>{
    self.skipWaiting();
    event.waitUntil(
        caches.open('v1').then(cache=> {
            return cache.addAll([
                '/',
                '/script.js',
                '/style.css',
                '/favicon.png',
                '/index.js',
                '/manifest.webmanifest'
            ]);
        })
    );
});

self.addEventListener('fetch', event=>{
    event.respondWith(route(event.request))
})


function route(request) {
    if (request.url.includes('google-analytics')) {
        return get(request)
    }
    return cacheFetch(request)
}
async function cacheFetch(request) {
    let response = await caches.match(request);
    if (response) {
        return response
    }
    response = await fetch(request),
        clone = response.clone();
    if (response.status!='0') {
        caches.open('v1').then(cache => {
            cache.put(request, clone)
        });
    }
    return response
}
function get(request) {
    return fetch(request)
}