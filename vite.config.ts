// import mkcert from 'vite-plugin-mkcert'
import type { VitePWAOptions } from 'vite-plugin-pwa'
import process from 'node:process'
import { fileURLToPath, URL } from 'url'
import replace from '@rollup/plugin-replace'
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

const pwaOptions: Partial<VitePWAOptions> = {
  mode: process.env.SW_DEV === 'true' ? 'development' : 'production',
  base: '/',
  includeAssets: ['favicon.svg'],

  manifest: {
    display: 'standalone',
    icons: [
      { sizes: '192x192', src: 'icons/192.png' },
      { sizes: '512x512', src: 'icons/512.png' },
    ],
    name: 'HRMS BASIC',
    short_name: 'HRMS',
    start_url: '.',
    theme_color: '#ffffff',
  },
  workbox: {
    runtimeCaching: [
      {
        handler: 'CacheFirst',
        options: {
          cacheName: 'google-fonts-cache',
          cacheableResponse: {
            statuses: [0, 200],
          },
          expiration: {
            maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
            maxEntries: 10,
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
            maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
            maxEntries: 10,
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
            maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
            maxEntries: 10,
          },
        },
        urlPattern: /^https:\/\/unpkg\.com\/.*/i,
      },
    ],
  },
  devOptions: {
    enabled: process.env.SW_DEV === 'true',
    /* when using generateSW the PWA plugin will switch to classic */
    type: 'module',
    navigateFallback: 'index.html',
  },
}

const replaceOptions = { __DATE__: new Date().toISOString() }
const claims = process.env.CLAIMS === 'true'
const reload = process.env.RELOAD_SW === 'true'
const selfDestroying = process.env.SW_DESTROY === 'true'

if (process.env.SW === 'true') {
  pwaOptions.srcDir = 'src'
  pwaOptions.filename = claims ? 'claims-sw.ts' : 'prompt-sw.ts'
  pwaOptions.strategies = 'injectManifest'
  pwaOptions.injectManifest = {
    minify: !(process.env.SW_DEV === 'true'),
    enableWorkboxModulesLogs: process.env.SW_DEV === 'true' ? true : undefined,
  }
}

if (claims) pwaOptions.registerType = 'autoUpdate'

if (reload) {
  // @ts-expect-error just ignore
  replaceOptions.__RELOAD_SW__ = 'true'
}

if (selfDestroying) pwaOptions.selfDestroying = selfDestroying

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
            '@headlessui/react',
            'zustand',
            'moment',
            'axios',
          ],
          'hook-form': ['yup', 'react-hook-form', '@hookform/resolvers'],
          'jobseeker-ui': ['dequal', 'dayjs', 'react-tailwindcss-datepicker', 'jobseeker-ui'],
          fullcalendar: [
            '@fullcalendar/core',
            '@fullcalendar/daygrid',
            '@fullcalendar/interaction',
            '@fullcalendar/list',
            '@fullcalendar/react',
            '@fullcalendar/timegrid',
          ],
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
    VitePWA(pwaOptions),
    replace(replaceOptions),
  ],
  resolve: {
    alias: [{ find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) }],
  },
})
