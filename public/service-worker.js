importScripts("/precache-manifest.f7e29dfccb363fdd3980d0e5212e0ec2.js", "https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

workbox.skipWaiting()
workbox.clientsClaim()

workbox.routing.registerRoute(
  new RegExp('https:.*min\.(css|js)'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'cdn-cache'
  })
)

workbox.precaching.precacheAndRoute(self.__precacheManifest || [])
