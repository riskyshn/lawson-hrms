import { create } from 'zustand'
import { mountStoreDevtool } from 'simple-zustand-devtools'
import { authService, accountService } from '@/services'
import { useTokenStore } from './token.store'

interface AuthStore {
  user: IUser | null
  login: (payload: { email: string; password: string }) => Promise<void>
  refreshAuth: () => Promise<void>
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,

  login: async (payload) => {
    const { data } = await authService.login(payload)
    set((state) => ({ ...state, user: data.user }))
    useTokenStore.getState().setTokens(data)
  },

  refreshAuth: async () => {
    const { access_token } = await useTokenStore.getState().refreshAccessToken()
    if (access_token) {
      const { data } = await accountService.getProfile()
      set((state) => ({ ...state, user: data.user }))
    }
  },
}))

if (import.meta.env.DEV) {
  mountStoreDevtool('auth.store', useAuthStore)
}
