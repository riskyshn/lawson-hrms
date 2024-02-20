import axios, { CreateAxiosDefaults } from 'axios'
import { useTokenStore } from '@/store'

type CreateAxiosInstanceOptions<T = any> = CreateAxiosDefaults<T> & {
  withAuth?: boolean
}

export function createAxiosInstance(options?: CreateAxiosInstanceOptions) {
  const { withAuth = false, ...axiosDefault } = options || {}
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
  return e.response?.data.meta.message || e.message
}
