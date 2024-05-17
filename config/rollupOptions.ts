import type { BuildOptions } from 'vite'

const rollupOptions: BuildOptions['rollupOptions'] = {
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
}

export default rollupOptions
