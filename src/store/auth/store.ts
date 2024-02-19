import { create } from 'zustand'
import { getProfile, login } from './api'
import useTokenStore from '../token/store'

interface AuthStore {
  user: IUser | null
  isLogin: () => boolean
  login: (payload: { email: string; password: string }) => Promise<void>
  checkAuth: () => Promise<void>
}

const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,

  isLogin: () => !!get().user,

  login: async (payload) => {
    const { data } = await login(payload)
    set((state) => ({ ...state, user: data.user }))
    useTokenStore.getState().setTokens({ access: data.access_token, refresh: data.refresh_token })
  },

  checkAuth: async () => {
    const { data } = await getProfile()
    set((state) => ({ ...state, user: data.user }))
  },
}))

export default useAuthStore
