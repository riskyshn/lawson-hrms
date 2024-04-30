import react from '@vitejs/plugin-react-swc'
import { fileURLToPath, URL } from 'url'
import { defineConfig } from 'vite'
// import mkcert from 'vite-plugin-mkcert'
import process from 'node:process'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // for https dev server
    // mkcert(),
    VitePWA({
      injectRegister: 'auto',
      manifest: {
        name: 'HRMS BASIC',
        short_name: 'HRMS',
        theme_color: '#ffffff',
        start_url: '.',
        display: 'standalone',
        icons: [
          { src: 'icons/192.png', sizes: '192x192' },
          { src: 'icons/512.png', sizes: '512x512' },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /^https:\/\/unpkg\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'unpkg-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },

          {
            urlPattern: /^https:\/\/master\.api-jobseeker\.site\/.*/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'master-data',
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 60 * 60 * 24 * 30, // <== 30 days
              },
            },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: [{ find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) }],
  },
  build: {
    sourcemap: process.env.SOURCE_MAP === 'true',
    rollupOptions: {
      output: {
        manualChunks: {
          'core-packages': [
            'react',
            'react-dom',
            'react-router-dom',
            'tailwind-merge',
            'js-cookie',
            'dequal',
            '@headlessui/react',
            'zustand',
            'yup',
            'moment',
            'axios',
            'react-hook-form',
            '@hookform/resolvers',
          ],
          'jobseeker-ui': ['jobseeker-ui', 'dayjs', 'react-tailwindcss-datepicker'],
          fullcalendar: [
            '@fullcalendar/core',
            '@fullcalendar/daygrid',
            '@fullcalendar/interaction',
            '@fullcalendar/list',
            '@fullcalendar/react',
            '@fullcalendar/timegrid',
          ],
          leaflet: ['leaflet', 'react-leaflet'],
          'chart.js': ['chart.js', 'react-chartjs-2'],
        },
      },
    },
  },
})
