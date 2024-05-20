import type { VitePWAOptions } from 'vite-plugin-pwa'

const workbox: VitePWAOptions['workbox'] = {
  runtimeCaching: [
    {
      handler: 'CacheFirst',
      options: {
        cacheName: 'google-fonts-cache',
        cacheableResponse: {
          statuses: [0, 200],
        },
        expiration: {
          maxAgeSeconds: 60 * 60 * 24 * 365, // 365 days
          maxEntries: 30,
        },
      },
      urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
    },
    {
      handler: 'CacheFirst',
      options: {
        cacheName: 'gstatic-fonts-cache',
        cacheableResponse: {
          statuses: [0, 200],
        },
        expiration: {
          maxAgeSeconds: 60 * 60 * 24 * 365, // 365 days
          maxEntries: 30,
        },
      },
      urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
    },
    {
      handler: 'CacheFirst',
      options: {
        cacheName: 'unpkg-cache',
        cacheableResponse: {
          statuses: [0, 200],
        },
        expiration: {
          maxAgeSeconds: 60 * 60 * 24 * 365, // 365 days
          maxEntries: 30,
        },
      },
      urlPattern: /^https:\/\/unpkg\.com\/.*/i,
    },
    {
      handler: 'CacheFirst',
      options: {
        cacheName: 'image-cache',
        cacheableResponse: {
          statuses: [0, 200],
        },
        expiration: {
          maxAgeSeconds: 60 * 60 * 24 * 365, // 365 days
          maxEntries: 200, // Adjust the number of entries based on your needs
        },
      },
      urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/i,
    },
  ],
}

export default workbox
