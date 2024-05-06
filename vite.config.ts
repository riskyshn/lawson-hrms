// import mkcert from 'vite-plugin-mkcert'
import process from 'node:process'
import { fileURLToPath, URL } from 'url'
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

// import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'chart.js': ['chart.js', 'react-chartjs-2'],
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
          fullcalendar: [
            '@fullcalendar/core',
            '@fullcalendar/daygrid',
            '@fullcalendar/interaction',
            '@fullcalendar/list',
            '@fullcalendar/react',
            '@fullcalendar/timegrid',
          ],
          'jobseeker-ui': ['jobseeker-ui', 'dayjs', 'react-tailwindcss-datepicker'],
          leaflet: ['leaflet', 'react-leaflet'],
        },
      },
    },
    sourcemap: process.env.SOURCE_MAP === 'true',
  },
  plugins: [
    react(),
    // for https dev server
    // mkcert(),
    // VitePWA({
    //   injectRegister: 'auto',
    //   manifest: {
    //     display: 'standalone',
    //     icons: [
    //       { sizes: '192x192', src: 'icons/192.png' },
    //       { sizes: '512x512', src: 'icons/512.png' },
    //     ],
    //     name: 'HRMS BASIC',
    //     short_name: 'HRMS',
    //     start_url: '.',
    //     theme_color: '#ffffff',
    //   },
    //   workbox: {
    //     runtimeCaching: [
    //       {
    //         handler: 'CacheFirst',
    //         options: {
    //           cacheName: 'google-fonts-cache',
    //           cacheableResponse: {
    //             statuses: [0, 200],
    //           },
    //           expiration: {
    //             maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
    //             maxEntries: 10,
    //           },
    //         },
    //         urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
    //       },
    //       {
    //         handler: 'CacheFirst',
    //         options: {
    //           cacheName: 'gstatic-fonts-cache',
    //           cacheableResponse: {
    //             statuses: [0, 200],
    //           },
    //           expiration: {
    //             maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
    //             maxEntries: 10,
    //           },
    //         },
    //         urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
    //       },
    //       {
    //         handler: 'CacheFirst',
    //         options: {
    //           cacheName: 'unpkg-cache',
    //           cacheableResponse: {
    //             statuses: [0, 200],
    //           },
    //           expiration: {
    //             maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
    //             maxEntries: 10,
    //           },
    //         },
    //         urlPattern: /^https:\/\/unpkg\.com\/.*/i,
    //       },

    //       {
    //         handler: 'StaleWhileRevalidate',
    //         options: {
    //           cacheName: 'master-data',
    //           expiration: {
    //             maxAgeSeconds: 60 * 60 * 24 * 30, // <== 30 days
    //             maxEntries: 20,
    //           },
    //         },
    //         urlPattern: /^https:\/\/master\.api-jobseeker\.site\/.*/i,
    //       },
    //     ],
    //   },
    // }),
  ],
  resolve: {
    alias: [{ find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) }],
  },
})
