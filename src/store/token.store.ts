import { create } from 'zustand'
import Cookies from 'js-cookie'
import { ACCESS_TOKEN_EXPIRATIONS, ACCESS_TOKEN_KEY, REFRESH_TOKEN_EXPIRATIONS, REFRESH_TOKEN_KEY } from '@/constants/tokens'
import { authService } from '@/services'

interface TokenStore {
  access_token: string | null
  refresh_token: string | null
  setAccessToken: (access_token: string) => void
  setRefreshToken: (refresh_token: string) => void
  setTokens: (tokens: { access_token: string; refresh_token: string }) => void
  retrieveCookieTokens: () => { access_token: string | null; refresh_token: string | null }
  refreshAccessToken: () => Promise<{ access_token: string | null; refresh_token: string | null }>
}

export const useTokenStore = create<TokenStore>((set, get) => ({
  access_token: Cookies.get(ACCESS_TOKEN_KEY) || null,
  refresh_token: Cookies.get(REFRESH_TOKEN_KEY) || null,

  setAccessToken: (access_token: string) => {
    Cookies.set(ACCESS_TOKEN_KEY, access_token, { expires: ACCESS_TOKEN_EXPIRATIONS / 24 })
    set((state) => ({ ...state, access_token }))
  },

  setRefreshToken: (refresh_token: string) => {
    Cookies.set(REFRESH_TOKEN_KEY, refresh_token, { expires: REFRESH_TOKEN_EXPIRATIONS / 24 })
    set((state) => ({ ...state, refresh_token }))
  },

  setTokens: ({ access_token, refresh_token }) => {
    get().setAccessToken(access_token)
    get().setRefreshToken(refresh_token)
  },

  retrieveCookieTokens: () => {
    const tokens = {
      access_token: Cookies.get(ACCESS_TOKEN_KEY) || null,
      refresh_token: Cookies.get(REFRESH_TOKEN_KEY) || null,
    }
    set((state) => ({ ...state, ...tokens }))

    return tokens
  },

  refreshAccessToken: async () => {
    const { refresh_token } = get().retrieveCookieTokens()
    if (refresh_token) {
      const { data } = await authService.refreshAccessToken({ refresh_token })
      const tokens = { access_token: data.access_token || null, refresh_token: data.refresh_token || null }
      get().setTokens(tokens)
      return tokens
    } else {
      throw new Error('Refresh token is missing. Unable to refresh access token.')
    }
  },
}))
