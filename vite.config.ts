import process from 'node:process'
import { fileURLToPath, URL } from 'url'
import replace, { RollupReplaceOptions } from '@rollup/plugin-replace'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA, VitePWAOptions } from 'vite-plugin-pwa'
import manifest from './config/manifest'
import rollupOptions from './config/rollupOptions'
import workbox from './config/workbox'

const pwaOptions: Partial<VitePWAOptions> = {
  mode: process.env.SW_DEV === 'true' ? 'development' : 'production',
  base: '/',
  includeAssets: ['favicon.svg'],
  manifest,
  workbox,
  devOptions: {
    enabled: process.env.SW_DEV === 'true',
    /* when using generateSW the PWA plugin will switch to classic */
    type: 'module',
    navigateFallback: 'index.html',
  },
}

const replaceOptions: RollupReplaceOptions = { __DATE__: new Date().toISOString(), preventAssignment: true }
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
if (reload) replaceOptions.__RELOAD_SW__ = 'true'
if (selfDestroying) pwaOptions.selfDestroying = selfDestroying

export default defineConfig({
  build: {
    rollupOptions,
    sourcemap: process.env.SOURCE_MAP === 'true',
  },
  plugins: [react(), VitePWA(pwaOptions), replace(replaceOptions)],
  resolve: {
    alias: [{ find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) }],
  },
})
