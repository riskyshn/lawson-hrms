/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/react" />
/// <reference types="vite-plugin-pwa/info" />
/// <reference lib="webworker" />

interface Window {
  __APP__: {
    BASE_API_URL: string
    SOURCE_APP: string
    SOURCE_LANG: 'en' | 'id'
    TINYMCE_API_KEY: string
  }
}
