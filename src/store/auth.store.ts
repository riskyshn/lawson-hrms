import { accountService, authService } from '@/services'
import { mountStoreDevtool } from 'simple-zustand-devtools'
import { create } from 'zustand'
import { useTokenStore, useOrganizationStore, useMasterStore } from '.'

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
    await Promise.all([useOrganizationStore.getState().init(), useMasterStore.getState().init()])
  },

  refreshAuth: async () => {
    const { data } = await accountService.fetchProfile()
    set((state) => ({ ...state, user: data }))
    await Promise.all([useOrganizationStore.getState().refresh(), useMasterStore.getState().refresh()])
  },

  logout: () => {
    useTokenStore.getState().clearTokens()
    set((state) => ({ ...state, user: null }))
    useOrganizationStore.getState().clean()
    useMasterStore.getState().clean()
  },
}))

if (import.meta.env.DEV) {
  mountStoreDevtool('auth.store', useAuthStore)
}
