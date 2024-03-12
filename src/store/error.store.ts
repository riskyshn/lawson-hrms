import { create } from 'zustand'
import { mountStoreDevtool } from 'simple-zustand-devtools'

interface ErrorStore {
  code: 404 | 500 | undefined
  message: string | undefined

  setError: (code: 404 | 500, message?: string) => void
}

export const useErrorStore = create<ErrorStore>((set) => ({
  code: undefined,
  message: undefined,

  setError(code, message) {
    set({ message, code })
  },
}))

if (import.meta.env.DEV) {
  mountStoreDevtool('error.store', useErrorStore)
}
