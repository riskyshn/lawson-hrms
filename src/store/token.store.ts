import { create } from 'zustand'
import { mountStoreDevtool } from 'simple-zustand-devtools'
import Cookies from 'js-cookie'
import { ACCESS_TOKEN_EXPIRATIONS, ACCESS_TOKEN_KEY, ACCESS_TOKEN_OK_KEY, REFRESH_TOKEN_KEY, TOKEN_EXPIRATIONS } from '@/constants/tokens'
import { authService } from '@/services'

interface TokenStore {
  access_token: string | null
  refresh_token: string | null
  setAccessToken: (access_token: string) => void
  setRefreshToken: (refresh_token: string) => void
  setTokens: (tokens: { access_token: string; refresh_token: string }) => void
  clearTokens: () => void
  accessTokenIsOk: () => boolean
  retrieveCookieTokens: () => { access_token: string | null; refresh_token: string | null }
  refreshAccessToken: () => Promise<{ access_token: string | null; refresh_token: string | null }>
}

export const useTokenStore = create<TokenStore>((set, get) => ({
  access_token: Cookies.get(ACCESS_TOKEN_KEY) || null,
  refresh_token: Cookies.get(REFRESH_TOKEN_KEY) || null,

  setAccessToken: (access_token: string) => {
    Cookies.set(ACCESS_TOKEN_OK_KEY, 'true', { expires: ACCESS_TOKEN_EXPIRATIONS / 24 })
    Cookies.set(ACCESS_TOKEN_KEY, access_token, { expires: TOKEN_EXPIRATIONS / 24 })
    set((state) => ({ ...state, access_token }))
  },

  setRefreshToken: (refresh_token: string) => {
    Cookies.set(REFRESH_TOKEN_KEY, refresh_token, { expires: TOKEN_EXPIRATIONS / 24 })
    set((state) => ({ ...state, refresh_token }))
  },

  setTokens: ({ access_token, refresh_token }) => {
    get().setAccessToken(access_token)
    get().setRefreshToken(refresh_token)
  },

  clearTokens: () => {
    Cookies.remove(ACCESS_TOKEN_OK_KEY)
    Cookies.remove(ACCESS_TOKEN_KEY)
    Cookies.remove(REFRESH_TOKEN_KEY)
    set((state) => ({ ...state, access_token: null, refresh_token: null }))
  },

  accessTokenIsOk: () => {
    return Cookies.get(ACCESS_TOKEN_OK_KEY) === 'true'
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
    const { refresh_token, access_token } = get().retrieveCookieTokens()

    if (refresh_token && access_token) {
      if (get().accessTokenIsOk()) return { refresh_token, access_token }

      try {
        const { data } = await authService.refreshAccessToken({ refresh_token, access_token })
        get().setTokens(data)
        return data
      } catch {
        // Handle refresh token request failure
        throw new Error('Failed to refresh access token. Please try again later.')
      }
    }

    // Throw error if either refresh token or access token is missing
    throw new Error('Refresh token or access token is missing. Unable to refresh access token.')
  },
}))

if (import.meta.env.DEV) {
  mountStoreDevtool('token.store', useTokenStore)
}
