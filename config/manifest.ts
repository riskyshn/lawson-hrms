import type { VitePWAOptions } from 'vite-plugin-pwa'

const manifest: VitePWAOptions['manifest'] = {
  name: 'HRMS BASIC',
  short_name: 'HRMS',
  display: 'standalone',
  start_url: '.',
  theme_color: '#ffffff',
  icons: [
    { sizes: '192x192', src: 'icons/192.png' },
    { sizes: '512x512', src: 'icons/512.png' },
  ],
}

export default manifest
