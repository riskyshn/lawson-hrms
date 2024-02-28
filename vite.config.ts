/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-expect-error
import { fileURLToPath, URL } from 'url'
// @ts-expect-error
import path from 'node:path'
// @ts-expect-error
import { createRequire } from 'node:module'
import { defineConfig, normalizePath } from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import react from '@vitejs/plugin-react'
import mkcert from 'vite-plugin-mkcert'

const require = createRequire(import.meta.url)
const cMapsDir = normalizePath(path.join(path.dirname(require.resolve('pdfjs-dist/package.json')), 'cmaps'))
const standardFontsDir = normalizePath(path.join(path.dirname(require.resolve('pdfjs-dist/package.json')), 'standard_fonts'))

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // for https dev server
    // mkcert(),
    viteStaticCopy({
      targets: [
        { src: cMapsDir, dest: '' },
        { src: standardFontsDir, dest: '' },
      ],
    }),
  ],
  resolve: {
    alias: [{ find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) }],
  },
})
