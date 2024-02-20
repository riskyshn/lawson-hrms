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
      let { access_token } = useTokenStore.getState().retrieveCookieTokens()

      if (!access_token) {
        access_token = (await useTokenStore.getState().refreshAccessToken()).access_token
      }

      if (access_token) {
        config.headers['Authorization'] = `Bearer ${access_token}`
      }

      return config
    })
  }

  return request
}

export function axiosErrorMessage(e: any) {
  return e.response?.data.meta.message || e.message
}
