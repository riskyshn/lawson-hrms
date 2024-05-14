import type { ICompany, IUser } from '../types'
import { create } from 'zustand'
import { accountService, authService, organizationService } from '../services'
import { mountStoreDevtool } from '../utils'
import { useTokenStore } from './token.store'

interface AuthStore {
  company: ICompany | null
  login: (payload: { email: string; password: string }) => Promise<void>
  logout: () => void
  refreshAuth: () => Promise<void>
  user: IUser | null
}

export const useAuthStore = create<AuthStore>((set) => ({
  company: null,
  login: async (payload) => {
    const { data } = await authService.login(payload)
    set({ user: data.user })
    useTokenStore.getState().setTokens(data)
    const company = await organizationService.fetchCompany()
    set({ company })
  },

  logout: () => {
    useTokenStore.getState().clearTokens()
    set({ company: null, user: null })
  },

  refreshAuth: async () => {
    const [auth, company] = await Promise.all([accountService.fetchProfile(), organizationService.fetchCompany()])
    set((state) => ({ ...state, company, user: auth.data }))
  },

  user: null,
}))

if (import.meta.env.DEV) {
  mountStoreDevtool('auth.store', useAuthStore)
}
