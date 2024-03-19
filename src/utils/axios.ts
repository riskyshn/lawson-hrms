import { SOURCE_APP } from '@/constants/globals'
import { useTokenStore } from '@/store'
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
      'X-Source-App': SOURCE_APP,
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

      return config
    })
  }

  return request
}

export function axiosErrorMessage(e: any) {
  return e.response?.data?.meta?.message || e.response?.message || e.message
}
