import { accountService, authService, organizationService } from '@/services'
import mountStoreDevtool from '@/utils/mount-store-devtool'
import { create } from 'zustand'
import { useTokenStore } from '.'

interface AuthStore {
  user: IUser | null
  company: ICompany | null
  login: (payload: { email: string; password: string }) => Promise<void>
  refreshAuth: () => Promise<void>
  logout: () => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  company: null,

  login: async (payload) => {
    const { data } = await authService.login(payload)
    set({ user: data.user })
    useTokenStore.getState().setTokens(data)
    const company = await organizationService.fetchCompany()
    set({ company })
  },

  refreshAuth: async () => {
    const [auth, company] = await Promise.all([accountService.fetchProfile(), organizationService.fetchCompany()])
    set((state) => ({ ...state, user: auth.data, company }))
  },

  logout: () => {
    useTokenStore.getState().clearTokens()
    set({ company: null, user: null })
  },
}))

if (import.meta.env.DEV) {
  mountStoreDevtool('auth.store', useAuthStore)
}
