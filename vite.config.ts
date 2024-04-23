import { fileURLToPath, URL } from 'url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
// import mkcert from 'vite-plugin-mkcert'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // for https dev server
    // mkcert(),
  ],
  resolve: {
    alias: [{ find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) }],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'core-packages': [
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
