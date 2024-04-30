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
          { src: 'icons/144.png', sizes: '144x144' },
          { src: 'icons/256.png', sizes: '256x256' },
          { src: 'icons/512.png', sizes: '512x512' },
          { src: 'icons/1024.png', sizes: '1024x1024' },
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
