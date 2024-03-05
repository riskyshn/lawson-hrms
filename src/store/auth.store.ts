import { create } from 'zustand'
import { mountStoreDevtool } from 'simple-zustand-devtools'
import { authService, accountService } from '@/services'
import { useTokenStore } from './token.store'

interface AuthStore {
  user: IUser | null
  login: (payload: { email: string; password: string }) => Promise<void>
  refreshAuth: () => Promise<void>
  logout: () => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,

  login: async (payload) => {
    const { data } = await authService.login(payload)
    set((state) => ({ ...state, user: data.user }))
    useTokenStore.getState().setTokens(data)
  },

  refreshAuth: async () => {
    const { data } = await accountService.fetchProfile()
    set((state) => ({ ...state, user: data }))
  },

  logout: () => {
    useTokenStore.getState().clearTokens()
    set((state) => ({ ...state, user: null }))
  },
}))

if (import.meta.env.DEV) {
  mountStoreDevtool('auth.store', useAuthStore)
}
