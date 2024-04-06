import { SOURCE_APP } from '@/constants/globals'
import { useAuthStore, useTokenStore } from '@/store'
import axios, { CreateAxiosDefaults } from 'axios'

type CreateAxiosInstanceOptions<T = any> = CreateAxiosDefaults<T> & {
  withAuth?: boolean
  withoutSource?: boolean
}

export function createAxiosInstance(options?: CreateAxiosInstanceOptions) {
  const { withAuth = false, withoutSource = false, ...axiosDefault } = options || {}

  if (!withoutSource) {
    axiosDefault.headers = {
      ...(axiosDefault.headers || {}),
      'x-source-app': SOURCE_APP,
      'x-lang': 'en',
    }
  } else {
    axiosDefault.headers = {
      ...(axiosDefault.headers || {}),
      'x-lang': 'en',
    }
  }

  const request = axios.create(axiosDefault)

  if (withAuth) {
    request.interceptors.request.use(async (config) => {
      try {
        const { refreshAccessToken } = useTokenStore.getState()
        const { access_token } = await refreshAccessToken()

        if (access_token) {
          config.headers['Authorization'] = `Bearer ${access_token}`
        }
      } catch {
        //
      }

      const isLocal =
        config?.baseURL?.startsWith('http://192.') ||
        config?.baseURL?.startsWith('http://172.') ||
        config?.baseURL?.startsWith('http://localhost')

      if (isLocal && useAuthStore.getState().user?.company?.oid) {
        config.headers['company_id'] = useAuthStore.getState().user?.company?.oid
      }

      return config
    })
  }

  return request
}

export function axiosErrorMessage(e: any) {
  return e.response?.data?.meta?.message || e.response?.data?.message || e.response?.message || e.message
}
