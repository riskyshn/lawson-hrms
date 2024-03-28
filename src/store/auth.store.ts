import { accountService, authService } from '@/services'
import mountStoreDevtool from '@/utils/mount-store-devtool'
import { create } from 'zustand'
import { useMasterStore, useOrganizationStore, useTokenStore } from '.'

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
    set((state) => ({ ...state, user: { ...data.user, employeeCode: '65f297de3360276728e011a7' } }))
    useTokenStore.getState().setTokens(data)
    await Promise.all([useOrganizationStore.getState().init(), useMasterStore.getState().init()])
  },

  refreshAuth: async () => {
    const { data } = await accountService.fetchProfile()
    set((state) => ({ ...state, user: { ...data, employeeCode: '65f297de3360276728e011a7' } }))
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
