import { create } from 'zustand'
import Cookies from 'js-cookie'
import { ACCESS_TOKEN_EXPIRATIONS, ACCESS_TOKEN_KEY, REFRESH_TOKEN_EXPIRATIONS, REFRESH_TOKEN_KEY } from '@/config/constants'

interface TokenStore {
  accessToken: string | null
  refreshToken: string | null
  setAccessToken: (token: string) => void
  setRefreshToken: (token: string) => void
  setTokens: (tokens: { access: string; refresh: string }) => void
}

const useTokenStore = create<TokenStore>((set, get) => ({
  accessToken: Cookies.get(ACCESS_TOKEN_KEY) || null,
  refreshToken: Cookies.get(REFRESH_TOKEN_KEY) || null,

  setAccessToken: (token: string) => {
    Cookies.set(ACCESS_TOKEN_KEY, token, { expires: ACCESS_TOKEN_EXPIRATIONS / 24 })
    set(() => ({ accessToken: token }))
  },

  setRefreshToken: (token: string) => {
    Cookies.set(REFRESH_TOKEN_KEY, token, { expires: REFRESH_TOKEN_EXPIRATIONS / 24 })
    set(() => ({ refreshToken: token }))
  },

  setTokens: ({ access, refresh }) => {
    get().setAccessToken(access)
    get().setRefreshToken(refresh)
  },
}))

export default useTokenStore
